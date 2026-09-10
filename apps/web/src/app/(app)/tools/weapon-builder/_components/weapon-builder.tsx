"use client";
import { PolarityPicker } from "@/ui/polarity";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Crosshair,
  Info,
  LockKeyhole,
  Plus,
  RotateCcw,
  RotateCw,
  Save,
  Search,
  Sparkles,
  Trash2,
  UnlockKeyhole,
  X,
} from "lucide-react";
import Link from "next/link";
import { Dialog, ConfidenceBadge } from "@/ui";
import { ItemImage } from "@/ui/item-image";
import { ModCard } from "@/ui/mod-card";
import { OwnedModPicker } from "@/ui/owned-mod-picker";
import { buildFragment, parseFragment, saveBuild } from "@/ui/build-storage";
import type {
  BuildWeaponRequest,
  BuildWeaponResponse,
  CompatibleMod,
  ModSlot,
  OptimizationResult,
  OptimizeOptions,
  WeaponDetail,
  WeaponListItem,
} from "@/server/contracts";
import styles from "./weapon-builder.module.css";

const initial: BuildWeaponRequest = {
  weaponId: "braton",
  modSlots: [],
  capacity: 60,
  slotPolarities: {},
  scenario: {
    headshots: false,
    statusTypesOnTarget: 0,
    killStacks: 5,
    arcaneStacks: 12,
    level: 100,
    steelPath: false,
  },
};
const presetEnemy: Record<string, string> = {
  Grineer: "heavy_gunner",
  Corpus: "tech",
  Infested: "ancient_healer",
  Corrupted: "corrupted_heavy",
};
const number = (n?: number | null, digits = 1) =>
  n == null || !Number.isFinite(n)
    ? "—"
    : new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(
        n,
      );
const metric = (result: BuildWeaponResponse | null, key: string) =>
  result?.stats.find((s) => s.key === key)?.value;
function MetricConfidence({
  result,
  metricKey,
}: {
  result: BuildWeaponResponse | null;
  metricKey: string;
}) {
  const tag = result?.stats.find((s) => s.key === metricKey)?.confidence;
  return tag ? <ConfidenceBadge tag={tag} /> : null;
}
const damageColors: Record<string, string> = {
  impact: "#94a1af",
  puncture: "#bcae8a",
  slash: "#cd7672",
  heat: "#ce9255",
  cold: "#8fc5d4",
  toxin: "#91af63",
  electricity: "#a0a8d8",
  viral: "#bc91ac",
  corrosive: "#8db775",
  magnetic: "#8baed3",
  radiation: "#c6bc79",
  blast: "#be936c",
  gas: "#a9a275",
};
async function requestBuild(
  build: BuildWeaponRequest,
  signal?: AbortSignal,
): Promise<BuildWeaponResponse> {
  const response = await fetch("/api/build/weapon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(build),
    signal,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? "Calculation failed.");
  return data;
}
export function WeaponBuilder() {
  const params = useSearchParams();
  const [build, setBuild] = useState<BuildWeaponRequest>(initial);
  const [weapons, setWeapons] = useState<WeaponListItem[]>([]),
    [detail, setDetail] = useState<WeaponDetail | null>(null);
  const [result, setResult] = useState<BuildWeaponResponse | null>(null),
    [comparison, setComparison] = useState<BuildWeaponResponse | null>(null);
  const [picker, setPicker] = useState<"weapon" | number | null>(null),
    [query, setQuery] = useState("");
  const [history, setHistory] = useState<BuildWeaponRequest[]>([]),
    [future, setFuture] = useState<BuildWeaponRequest[]>([]);
  const [options, setOptions] = useState<OptimizeOptions>({
    target: "general",
    goal: "ttk",
    damage: "auto",
    maxForma: 2,
    lockedSlots: [],
  });
  const [optimization, setOptimization] = useState<OptimizationResult | null>(
      null,
    ),
    [optimizing, setOptimizing] = useState(false);
  const [pending, setPending] = useState(true),
    [error, setError] = useState<string | null>(null),
    [notice, setNotice] = useState("");
  const [saveOpen, setSaveOpen] = useState(false),
    [buildName, setBuildName] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [arcaneOpen, setArcaneOpen] = useState(false);
  const [baseResult, setBaseResult] = useState<BuildWeaponResponse | null>(
    null,
  );
  const conditional =
    build.scenario.arcaneStacks > 0 || build.scenario.killStacks > 0;
  const optimizerController = useRef<AbortController | null>(null);
  const weapon = weapons.find((w) => w.id === build.weaponId);
  useEffect(() => {
    fetch("/api/weapons")
      .then((r) => {
        if (!r.ok) throw new Error("Unable to load weapons.");
        return r.json();
      })
      .then(setWeapons)
      .catch((e) => setError(e.message));
  }, []);
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith("#build=")) {
        const incoming = parseFragment(hash.slice(7));
        setBuild(incoming);
        setOptions((o) => ({
          ...o,
          target:
            (Object.keys(presetEnemy).find(
              (f) =>
                f.toLowerCase() === incoming.scenario.faction?.toLowerCase(),
            ) as OptimizeOptions["target"]) ?? "general",
        }));
        setNotice(
          "Shared build loaded. Recalculated with this engine version.",
        );
        return;
      }
      const id = params.get("weapon");
      if (id) setBuild({ ...initial, weaponId: id });
    } catch (e) {
      setError((e as Error).message);
    }
  }, [params]);
  useEffect(() => {
    const controller = new AbortController();
    setDetail(null);
    setResult(null);
    setComparison(null);
    setOptimization(null);
    fetch(`/api/weapons/${encodeURIComponent(build.weaponId)}`, {
      signal: controller.signal,
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        return data;
      })
      .then(setDetail)
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => controller.abort();
  }, [build.weaponId]);
  useEffect(() => {
    const controller = new AbortController();
    setPending(true);
    const timer = setTimeout(
      () =>
        Promise.all([
          requestBuild(build, controller.signal),
          requestBuild(
            {
              ...build,
              scenario: { ...build.scenario, killStacks: 0, arcaneStacks: 0 },
            },
            controller.signal,
          ),
        ])
          .then(([next, base]) => {
            setBaseResult(base);
            setResult(next);
            setError(null);
            setPending(false);
          })
          .catch((e) => {
            if (e.name !== "AbortError") {
              setError(e.message);
              setPending(false);
            }
          }),
      150,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [build]);
  useEffect(() => () => optimizerController.current?.abort(), []);
  useEffect(() => {
    const target = (Object.keys(presetEnemy).find(
      (f) =>
        presetEnemy[f] === build.scenario.enemyArchetypeId ||
        f.toLowerCase() === build.scenario.faction?.toLowerCase(),
    ) ?? "general") as OptimizeOptions["target"];
    setOptions((current) =>
      current.target === target ? current : { ...current, target },
    );
    setComparison(null);
  }, [
    build.scenario.enemyArchetypeId,
    build.scenario.faction,
    build.scenario.level,
    build.scenario.steelPath,
    build.scenario.headshots,
    build.scenario.statusTypesOnTarget,
    build.scenario.killStacks,
    build.scenario.arcaneStacks,
  ]);
  useEffect(() => {
    optimizerController.current?.abort();
    setOptimizing(false);
    setOptimization(null);
  }, [options]);
  function change(next: BuildWeaponRequest) {
    if (JSON.stringify(next.scenario) !== JSON.stringify(build.scenario))
      setComparison(null);
    optimizerController.current?.abort();
    setOptimizing(false);
    setOptimization(null);
    setNotice("");
    setHistory((h) => [...h, build].slice(-30));
    setFuture([]);
    setBuild(next);
  }
  function choose(id: string) {
    change({ ...initial, weaponId: id });
    setOptions((o) => ({ ...o, target: "general", lockedSlots: [] }));
    setPicker(null);
    setQuery("");
  }
  function openPicker(next: typeof picker) {
    setQuery("");
    setPicker(next);
  }
  function updateSlot(index: number, update: Partial<ModSlot>) {
    change({
      ...build,
      modSlots: build.modSlots.map((s) =>
        s.slotIndex === index ? { ...s, ...update } : s,
      ),
    });
  }
  function updateTarget(target: OptimizeOptions["target"]) {
    setOptions((o) => ({ ...o, target }));
    change({
      ...build,
      scenario: {
        ...build.scenario,
        faction: target === "general" ? undefined : target,
        enemyArchetypeId: presetEnemy[target],
      },
    });
    setComparison(null);
  }
  async function optimize() {
    const controller = new AbortController();
    optimizerController.current = controller;
    setOptimizing(true);
    setError(null);
    setNotice("");
    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ build, options }),
        signal: controller.signal,
      });
      const data = (await response.json()) as OptimizationResult & {
        result: BuildWeaponResponse;
        error?: string;
      };
      if (!response.ok) throw new Error(data.error ?? "Optimization failed.");
      const previous = await requestBuild(
        { ...build, scenario: data.build.scenario },
        controller.signal,
      );
      if (controller.signal.aborted) return;
      setHistory((h) => [...h, build].slice(-30));
      setFuture([]);
      setComparison(previous);
      setBuild(data.build);
      setOptimization(data);
      setResult(data.result);
      setNotice("Build ready. Review the changes and investment below.");
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message);
    } finally {
      if (optimizerController.current === controller) setOptimizing(false);
    }
  }
  async function share() {
    const url = `${window.location.origin}/tools/weapon-builder#build=${buildFragment(build)}`;
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setNotice(
        "Build link copied. Anyone with the link can open this snapshot.",
      );
    } catch {
      setNotice("Copy the build link below.");
    }
  }
  const dps = metric(result, "sustainedDps"),
    beforeDps = metric(comparison, "sustainedDps");
  const parts = result
    ? [
        ...result.stats
          .filter((s) => ["impact", "puncture", "slash"].includes(s.key))
          .map((s) => ({ type: s.key as string, value: s.value })),
        ...(result.stats.find((s) => s.key === "elementalDamage")?.breakdown ??
          []),
      ].filter((p) => p.value > 0)
    : [];
  const total = parts.reduce((sum, p) => sum + p.value, 0) || 1;
  const inventorySlot =
    typeof picker === "number"
      ? picker
      : Array.from({ length: 8 }, (_, i) => i).find(
          (i) => !build.modSlots.some((s) => s.slotIndex === i),
        );
  const compatible =
    (inventorySlot === 8 ? detail?.exilusMods : detail?.mods)?.filter((m) =>
      `${m.name} ${m.primaryEffect}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    ) ?? [];
  function renderModSlot(index: number) {
    const slot = build.modSlots.find((s) => s.slotIndex === index),
      mod = [...(detail?.mods ?? []), ...(detail?.exilusMods ?? [])].find(
        (m) => m.id === slot?.modId,
      ),
      locked = options.lockedSlots.includes(index);
    return (
      <article
        className={`${styles.modSlot} ${picker === index ? styles.selectedSlot : ""} ${mod ? styles.equipped : ""} ${locked ? styles.locked : ""} ${index === 8 ? styles.exilusSlot : ""}`}
        key={index}
        data-slot-polarized={Boolean(build.slotPolarities?.[index])}
      >
        <button
          className={styles.modPick}
          onClick={() => openPicker(index)}
          aria-label={
            mod
              ? `Replace ${mod.name} in slot ${index + 1}`
              : index === 8
                ? "Empty Exilus slot"
                : `Empty slot ${index + 1}`
          }
        >
          <span className={styles.slotNumber}>
            {index === 8 ? "EXILUS" : String(index + 1).padStart(2, "0")}
          </span>
          {mod ? (
            <ModCard mod={mod} rank={slot!.rank} compact />
          ) : (
            <>
              <Plus size={23} strokeWidth={1} />
              <strong>{index === 8 ? "Exilus mod" : "Add mod"}</strong>
              <small>
                {index === 8
                  ? "Utility mods only · kept by solver"
                  : "Choose from your arsenal"}
              </small>
            </>
          )}
        </button>
        <div className={styles.polarityControl}>
          <span>SLOT POLARITY</span>
          <PolarityPicker
            label={`Polarity for slot ${index + 1}`}
            value={build.slotPolarities?.[index] ?? ""}
            onChange={(value) => {
              const polarities = { ...build.slotPolarities };
              if (value) polarities[index] = value;
              else delete polarities[index];
              change({ ...build, slotPolarities: polarities });
            }}
          />
        </div>
        <div className={styles.slotTools}>
          {mod && (
            <>
              <button
                aria-label={`${locked ? "Unlock" : "Lock"} ${mod.name}`}
                title="Keep this mod during optimization"
                onClick={() =>
                  setOptions((o) => ({
                    ...o,
                    lockedSlots: locked
                      ? o.lockedSlots.filter((i) => i !== index)
                      : [...o.lockedSlots, index],
                  }))
                }
              >
                {locked ? (
                  <LockKeyhole size={13} />
                ) : (
                  <UnlockKeyhole size={13} />
                )}
              </button>
              <select
                aria-label={`Rank for ${mod.name}`}
                value={slot!.rank}
                onChange={(e) =>
                  updateSlot(index, {
                    rank: Number(e.target.value),
                  })
                }
              >
                {Array.from({ length: mod.maxRank + 1 }, (_, i) => (
                  <option key={i} value={i}>
                    R{i}
                  </option>
                ))}
              </select>
              <button
                aria-label={`Remove ${mod.name}`}
                onClick={() => {
                  change({
                    ...build,
                    modSlots: build.modSlots.filter(
                      (s) => s.slotIndex !== index,
                    ),
                  });
                  setOptions((o) => ({
                    ...o,
                    lockedSlots: o.lockedSlots.filter((i) => i !== index),
                  }));
                }}
              >
                <Trash2 size={13} />
              </button>
            </>
          )}
        </div>
      </article>
    );
  }
  return (
    <div className={styles.builder}>
      <div className={styles.breadcrumb}>
        <Link href="/arsenal">ARSENAL</Link>
        <span>/</span> WEAPON BUILDER <span className={styles.beta}>LAB</span>
      </div>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>MAKE EVERY SLOT COUNT</p>
          <h1>{weapon?.name ?? "Your next build"}</h1>
          <p className={styles.subtitle}>
            Built around your weapon. Tuned to your mission.
          </p>
          <div className={styles.chips}>
            <span>{weapon?.category ?? "Loading arsenal"}</span>
            <span>Catalog base form</span>
            {weapon?.isIncarnon && <span>Incarnon available</span>}
          </div>
          <button
            className={styles.outline}
            onClick={() => openPicker("weapon")}
          >
            <ArrowLeftRight size={14} /> Choose weapon
          </button>
        </div>
        <div className={styles.heroArt}>
          {weapon && <ItemImage name={weapon.name} priority />}
          <span className={styles.artLabel}>
            ARSENAL / {weapon?.id.toUpperCase()}
          </span>
        </div>
      </header>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLabel}>
          <Crosshair size={15} /> BUILD CONFIGURATION{" "}
          <span>
            {build.modSlots.filter((s) => s.slotIndex < 8).length}/8 MODS
          </span>
        </div>
        <div className={styles.toolbarActions}>
          <button
            aria-label="Undo"
            title="Undo"
            disabled={!history.length || optimizing}
            onClick={() => {
              setFuture((f) => [build, ...f]);
              setBuild(history.at(-1)!);
              setHistory((h) => h.slice(0, -1));
              setOptimization(null);
            }}
          >
            <RotateCcw size={16} />
          </button>
          <button
            aria-label="Redo"
            title="Redo"
            disabled={!future.length || optimizing}
            onClick={() => {
              setHistory((h) => [...h, build]);
              setBuild(future[0]);
              setFuture((f) => f.slice(1));
              setOptimization(null);
            }}
          >
            <RotateCw size={16} />
          </button>
          <span />
          <button
            aria-label="Compare"
            disabled={pending || !!error}
            onClick={() => {
              setComparison(result);
              setNotice(
                "Current results pinned for comparison. Keep the same target when comparing.",
              );
            }}
          >
            <ArrowLeftRight size={15} />
            <span>Compare</span>
          </button>
          <button
            aria-label="Save"
            onClick={() => {
              setBuildName(
                `${weapon?.name ?? "Weapon"} · ${options.target === "general" ? "General use" : options.target}`,
              );
              setSaveOpen(true);
            }}
            disabled={pending || !!error}
          >
            <Save size={15} />
            <span>Save</span>
          </button>
          <button
            aria-label="Share"
            onClick={share}
            disabled={pending || !!error}
          >
            <Copy size={15} />
            <span>Share</span>
          </button>
        </div>
      </div>
      {notice && (
        <div className={styles.notice} role="status">
          <Check size={15} />
          {notice}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={14} />
          </button>
        </div>
      )}
      {error && (
        <div className={styles.error} role="alert">
          <Info size={16} />
          <span>
            {error}{" "}
            {result && "Results below belong to the last valid configuration."}
          </span>
        </div>
      )}
      {shareUrl && (
        <div className={styles.shareBox}>
          <label>
            Snapshot link
            <input
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
            />
          </label>
          <button
            className={styles.iconButton}
            aria-label="Close share link"
            onClick={() => setShareUrl("")}
          >
            <X size={16} />
          </button>
        </div>
      )}
      <div className={styles.workspace}>
        <div className={styles.editor}>
          <section className={styles.modPanel}>
            <div className={styles.sectionHeader}>
              <h2>CONFIGURATION</h2>
              <span>1–4 TOP · 5–8 BOTTOM</span>
            </div>
            <div className={styles.modGrid}>
              {Array.from({ length: 8 }, (_, index) => renderModSlot(index))}
            </div>
            <div className={styles.modFooter}>
              <span>
                <LockKeyhole size={12} /> Lock a mod to keep it when optimizing.
              </span>
              <button
                onClick={() => {
                  change({ ...build, modSlots: [] });
                  setOptions((o) => ({ ...o, lockedSlots: [] }));
                }}
              >
                Clear mods
              </button>
            </div>
            <section
              className={styles.calculationPanel}
              aria-label="Build details"
            >
              <div className={styles.sectionHeader}>
                <h2>DAMAGE / PROJECTILE</h2>
                <span>{conditional ? "BONUSES ACTIVE" : "BASE STATS"}</span>
              </div>
              <div className={styles.statTiles}>
                {parts.map((p) => (
                  <div key={p.type}>
                    <i style={{ background: damageColors[p.type] }} />
                    <span>{p.type}</span>
                    <strong>{number(p.value)}</strong>
                  </div>
                ))}
              </div>
              <div className={styles.statTiles}>
                <div>
                  <span>Critical chance</span>
                  <MetricConfidence
                    result={result}
                    metricKey="criticalChance"
                  />
                  <strong>
                    {number((metric(result, "criticalChance") ?? 0) * 100)}%
                  </strong>
                </div>
                <div>
                  <span>Critical multiplier</span>
                  <MetricConfidence
                    result={result}
                    metricKey="criticalMultiplier"
                  />
                  <strong>
                    {number(metric(result, "criticalMultiplier"))}×
                  </strong>
                </div>
                <div>
                  <span>Status chance</span>
                  <MetricConfidence result={result} metricKey="statusChance" />
                  <strong>
                    {number((metric(result, "statusChance") ?? 0) * 100)}%
                  </strong>
                </div>
              </div>
              {optimization && (
                <div className={styles.solveSummary}>
                  <Check size={14} />
                  <span>BEST FOUND</span>
                  <span>{optimization.forma} additional Forma</span>
                  {optimization.explanation
                    .filter(
                      (t) =>
                        t.startsWith("Required") || t.includes("preference"),
                    )
                    .map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                </div>
              )}
            </section>
          </section>
          <div className={styles.specialSlots}>
            {" "}
            {!!detail?.arcaneSlots && (
              <section
                className={styles.arcanePanel}
                aria-label="Weapon arcane"
              >
                <div className={styles.sectionHeader}>
                  <h2>WEAPON ARCANE</h2>
                </div>
                <button
                  className={styles.arcanePickerButton}
                  aria-label="Choose weapon arcane"
                  onClick={() => setArcaneOpen(true)}
                >
                  {build.arcaneIds?.[0] ? (
                    <ItemImage
                      kind="arcane"
                      name={
                        detail.arcanes.find(
                          (a) => a.id === build.arcaneIds?.[0],
                        )?.name ?? "Arcane"
                      }
                    />
                  ) : (
                    <Plus size={36} />
                  )}
                  <strong>
                    {detail.arcanes.find((a) => a.id === build.arcaneIds?.[0])
                      ?.name ?? "Choose arcane"}
                  </strong>
                  <ChevronDown size={16} />
                </button>
                {build.arcaneIds?.[0] && (
                  <p className={styles.arcaneDescription}>
                    {
                      detail.arcanes.find((a) => a.id === build.arcaneIds?.[0])
                        ?.description
                    }
                  </p>
                )}
              </section>
            )}
            {detail?.exilusSlot && renderModSlot(8)}
          </div>{" "}
          <section className={styles.scenario}>
            <div className={styles.sectionHeader}>
              <h2>TUNE YOUR BUILD</h2>
              <span>YOUR MISSION. YOUR RULES.</span>
            </div>
            <div className={styles.controls}>
              <label>
                Target faction
                <select
                  value={options.target}
                  onChange={(e) =>
                    updateTarget(e.target.value as OptimizeOptions["target"])
                  }
                >
                  <option value="general">
                    General use · all four factions
                  </option>
                  {Object.keys(presetEnemy).map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </label>
              <label>
                Optimize for
                <select
                  value={options.goal}
                  onChange={(e) => {
                    setOptions((o) => ({
                      ...o,
                      goal: e.target.value as OptimizeOptions["goal"],
                    }));
                    setOptimization(null);
                  }}
                >
                  <option value="ttk">
                    Combat effectiveness · status + kill time
                  </option>
                  <option value="sustained">
                    Paper sustained DPS · direct damage
                  </option>
                  <option value="burst">Paper burst DPS · direct damage</option>
                </select>
              </label>
              <label>
                Damage preference
                <select
                  value={options.damage}
                  onChange={(e) => {
                    setOptions((o) => ({
                      ...o,
                      damage: e.target.value as OptimizeOptions["damage"],
                    }));
                    setOptimization(null);
                  }}
                >
                  {[
                    "auto",
                    "viral_heat",
                    "corrosive_heat",
                    "viral",
                    "corrosive",
                    "magnetic",
                    "radiation",
                    "heat",
                    "toxin",
                    "blast",
                    "gas",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d === "auto"
                        ? "Auto · let the solver choose"
                        : d
                            .split("_")
                            .map(
                              (part) => part[0].toUpperCase() + part.slice(1),
                            )
                            .join(" + ")}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Additional Forma
                <select
                  value={options.maxForma}
                  onChange={(e) => {
                    setOptions((o) => ({
                      ...o,
                      maxForma: Number(e.target.value),
                    }));
                    setOptimization(null);
                  }}
                >
                  <option value={0}>0 · keep my polarities</option>
                  <option value={1}>Up to 1 Forma</option>
                  <option value={2}>Up to 2 Forma</option>
                  <option value={4}>Up to 4 Forma</option>
                  <option value={8}>Up to 8 Forma</option>
                </select>
              </label>
            </div>
            <details className={styles.advanced}>
              <summary>
                Capacity & combat assumptions <ChevronDown size={14} />
              </summary>
              <div className={styles.controls}>
                <label>
                  Configured capacity
                  <select
                    value={build.capacity ?? 60}
                    onChange={(e) =>
                      change({ ...build, capacity: Number(e.target.value) })
                    }
                  >
                    {[30, 40, 60, 80].map((n) => (
                      <option key={n} value={n}>
                        {n} capacity
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Base mission level
                  <input
                    type="number"
                    min={1}
                    max={9999}
                    value={build.scenario.level ?? 100}
                    onChange={(e) => {
                      change({
                        ...build,
                        scenario: {
                          ...build.scenario,
                          level: Math.max(
                            1,
                            Math.min(9999, Number(e.target.value)),
                          ),
                        },
                      });
                      setComparison(null);
                    }}
                  />
                </label>
                <label>
                  Existing status types
                  <select
                    value={build.scenario.statusTypesOnTarget}
                    onChange={(e) =>
                      change({
                        ...build,
                        scenario: {
                          ...build.scenario,
                          statusTypesOnTarget: Number(e.target.value),
                        },
                      })
                    }
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={styles.checks}>
                <label>
                  <input
                    type="checkbox"
                    checked={build.scenario.steelPath ?? false}
                    onChange={(e) => {
                      change({
                        ...build,
                        scenario: {
                          ...build.scenario,
                          steelPath: e.target.checked,
                        },
                      });
                      setComparison(null);
                    }}
                  />{" "}
                  Steel Path (+100 to base level)
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={build.scenario.headshots}
                    onChange={(e) =>
                      change({
                        ...build,
                        scenario: {
                          ...build.scenario,
                          headshots: e.target.checked,
                        },
                      })
                    }
                  />{" "}
                  Headshots
                </label>
              </div>
              <OwnedModPicker
                mods={[...(detail?.mods ?? []), ...(detail?.exilusMods ?? [])]}
                selected={options.ownedModIds}
                onChange={(ids) => {
                  setOptions((o) => ({ ...o, ownedModIds: ids }));
                  setOptimization(null);
                }}
              />
              <label className={styles.check}>
                <input
                  type="checkbox"
                  checked={options.allowAccuracyPenalty ?? false}
                  onChange={(e) =>
                    setOptions((o) => ({
                      ...o,
                      allowAccuracyPenalty: e.target.checked,
                    }))
                  }
                />
                Allow accuracy-reducing mods such as Heavy Caliber (paper DPS
                assumes every shot hits)
              </label>
              <p className={styles.help}>
                Capacity and existing polarities are your configured equipment,
                not imported inventory. No external buffs or custom Riven rolls
                are assumed.
              </p>
            </details>
          </section>
          {optimization && (
            <section className={styles.matrix}>
              <div className={styles.sectionHeader}>
                <h2>ONE BUILD. FOUR FACTIONS.</h2>
                <span>LEGACY MODEL ESTIMATES</span>
              </div>
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr>
                      <th>Target</th>
                      <th>Paper DPS</th>
                      <th>TTK</th>
                      <th>Peak status stacks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optimization.matrix.map((row) => (
                      <tr key={row.faction}>
                        <td>
                          {row.faction}
                          <small>{row.enemy}</small>
                        </td>
                        <td>{number(row.sustainedDps)}</td>
                        <td>
                          {row.ttk == null ? "> 600 s" : `${number(row.ttk)} s`}
                        </td>
                        <td>
                          <small>
                            Viral {number(row.peakViralStacks, 1)} · Corrosive{" "}
                            {number(row.peakCorrosiveStacks, 1)}
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
        <aside
          id="build-results"
          className={styles.results}
          aria-busy={pending || optimizing}
        >
          <div className={styles.capacityReadout}>
            <span>CAPACITY REMAINING</span>
            <strong>
              {pending
                ? "…"
                : result
                  ? (build.capacity ?? 60) - result.capacityUsed
                  : "—"}{" "}
              / {build.capacity ?? 60}
            </strong>
          </div>{" "}
          <div className={styles.sectionHeader}>
            <h2>BUILD PERFORMANCE</h2>
            <span className={styles.liveDot} />
          </div>
          <section className="ttk-focus" aria-label="Expected time to kill">
            <div>
              <h3>EXPECTED TTK</h3>
              {result?.ttk && <ConfidenceBadge tag={result.ttk.confidence} />}
            </div>
            <strong>
              {pending
                ? "…"
                : result?.ttk
                  ? result.ttk.value == null
                    ? result.ttk.outcome === "unsupported"
                      ? "Unavailable"
                      : "> 600 s"
                    : `${number(result.ttk.value)} s`
                  : "—"}
            </strong>
            <label>
              TTK target
              <select
                aria-label="TTK target"
                value={options.target}
                onChange={(e) =>
                  updateTarget(e.target.value as OptimizeOptions["target"])
                }
              >
                <option value="general">
                  Reference: Heavy Gunner · Grineer
                </option>
                {Object.keys(presetEnemy).map((f) => (
                  <option key={f} value={f}>
                    {f} · {presetEnemy[f].replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>
            <p>
              {result?.ttk?.target.name ?? "Heavy Gunner"} · Level{" "}
              {build.scenario.level ?? 100}
              {options.target === "general"
                ? " reference target · optimization remains faction agnostic"
                : " · selected faction target"}
            </p>
          </section>
          <label className={styles.conditionalToggle}>
            <input
              type="checkbox"
              role="switch"
              aria-label="Conditional damage"
              checked={conditional}
              onChange={(e) =>
                change({
                  ...build,
                  scenario: {
                    ...build.scenario,
                    killStacks: e.target.checked ? 5 : 0,
                    arcaneStacks: e.target.checked
                      ? (detail?.arcanes.find(
                          (a) => a.id === build.arcaneIds?.[0],
                        )?.maxStacks ?? 20)
                      : 0,
                  },
                })
              }
            />{" "}
            Conditional damage
          </label>
          <p className={styles.resultLabel}>
            {conditional ? "CONDITIONAL DPS" : "BASE DPS"}
          </p>
          <div className={styles.primaryMetric} data-metric="sustainedDps">
            {number(dps, 0)}
          </div>
          <MetricConfidence result={result} metricKey="sustainedDps" />
          {conditional && (
            <p className="confidence-note">
              <ConfidenceBadge tag="approximation" /> Conditions and maximum
              stacks are assumed maintained.
            </p>
          )}
          {comparison && beforeDps != null && dps != null && (
            <div className={styles.delta} data-delta>
              {dps >= beforeDps ? "+" : ""}
              {number(dps - beforeDps, 0)} <span>vs. pinned build</span>
            </div>
          )}
          <div className={styles.secondaryMetrics}>
            {[
              ["fireRate", "Fire rate", " shots/s"],
              ["multishot", "Multishot", "×"],
              ["magazine", "Magazine", ""],
              ["reloadTime", "Reload", " s"],
            ].map(([key, label, unit]) => (
              <div key={key}>
                <span>{label}</span>
                <MetricConfidence result={result} metricKey={key} />
                <strong data-metric={key}>
                  {number(metric(result, key))}
                  {unit}
                </strong>
              </div>
            ))}
            <div>
              <span>Base DPS</span>
              <MetricConfidence result={baseResult} metricKey="sustainedDps" />
              <strong data-metric="baseDps">
                {number(metric(baseResult, "sustainedDps"), 0)}
              </strong>
            </div>
            <div>
              <span>Burst DPS</span>
              <MetricConfidence result={result} metricKey="burstDps" />
              <strong>{number(metric(result, "burstDps"), 0)}</strong>
            </div>
            <div>
              <span>Modded base damage</span>
              <MetricConfidence result={result} metricKey="totalDamage" />
              <strong>{number(metric(result, "totalDamage"))}</strong>
            </div>
          </div>
          <div className={styles.divider} />
          <p className={styles.resultLabel}>DAMAGE DISTRIBUTION</p>
          <div className={styles.damageBar}>
            {parts.map((p) => (
              <span
                key={p.type}
                style={{
                  width: `${(p.value / total) * 100}%`,
                  background: damageColors[p.type] ?? "#90a4b0",
                }}
              />
            ))}
          </div>
          <div className={styles.damageLegend}>
            {parts.map((p) => (
              <span key={p.type}>
                <i style={{ background: damageColors[p.type] ?? "#90a4b0" }} />
                {p.type}
                <b>{number((p.value / total) * 100, 0)}%</b>
              </span>
            ))}
          </div>
          <div className={styles.secondaryMetrics}>
            <div>
              <span>Critical chance</span>
              <MetricConfidence result={result} metricKey="criticalChance" />
              <strong>
                {number((metric(result, "criticalChance") ?? 0) * 100)}%
              </strong>
            </div>
            <div>
              <span>Critical multiplier</span>
              <MetricConfidence
                result={result}
                metricKey="criticalMultiplier"
              />
              <strong>{number(metric(result, "criticalMultiplier"))}×</strong>
            </div>
            <div>
              <span>Status chance</span>
              <MetricConfidence result={result} metricKey="statusChance" />
              <strong>
                {number((metric(result, "statusChance") ?? 0) * 100)}%
              </strong>
            </div>
          </div>
          <section
            className="calculation-confidence"
            aria-label="Calculation confidence"
          >
            <h3>CALCULATION COVERAGE</h3>
            <p>
              Verified means a tested, cited formula—not live-game validation.
            </p>
            {result?.caveats.map((text) => (
              <p key={text}>
                <ConfidenceBadge tag="approximation" /> {text}
              </p>
            ))}
            {result?.ttk?.caveats.map((c) => (
              <p key={c.key}>
                <ConfidenceBadge tag={c.tag} /> {c.text}
              </p>
            ))}
            <p>
              <ConfidenceBadge tag="not-modeled" /> Custom armor-strip
              percentage, headshot percentage and status uptime are not modeled
              inputs.
            </p>
          </section>
          <div className={styles.optimizeArea}>
            <button
              className={styles.optimize}
              onClick={
                optimizing
                  ? () => {
                      optimizerController.current?.abort();
                      setOptimizing(false);
                      setNotice("Search cancelled. Your build is unchanged.");
                    }
                  : optimize
              }
              disabled={!detail || pending}
            >
              {optimizing ? (
                <>
                  <X size={17} /> Cancel search
                </>
              ) : (
                <>
                  <Sparkles size={17} /> Optimize build{" "}
                  <ArrowUpRight size={17} />
                </>
              )}
            </button>
          </div>
        </aside>
        <section
          id="mod-collection"
          className={styles.inventory}
          aria-label="Mod collection"
        >
          <div className={styles.sectionHeader}>
            <h2>MOD COLLECTION</h2>
            <span>
              {inventorySlot === undefined
                ? "SELECT A SLOT ABOVE"
                : inventorySlot === 8
                  ? "EXILUS MODS ONLY"
                  : `EQUIP TO SLOT ${inventorySlot + 1}`}
            </span>
          </div>{" "}
          <div className={styles.pickerSearch}>
            <Search size={17} />
            <input
              placeholder="Search compatible mods…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={styles.inventoryGrid}>
            {compatible.map((mod) => {
              const equipped = build.modSlots.some(
                (s) => s.modId === mod.id && s.slotIndex !== inventorySlot,
              );
              return (
                <button
                  disabled={equipped || inventorySlot === undefined}
                  key={mod.id}
                  onClick={() => {
                    change({
                      ...build,
                      modSlots: [
                        ...build.modSlots.filter(
                          (s) => s.slotIndex !== inventorySlot,
                        ),
                        {
                          modId: mod.id,
                          rank: mod.maxRank,
                          slotIndex: inventorySlot!,
                        },
                      ],
                    });
                    setPicker(null);
                  }}
                >
                  <ModCard mod={mod} compact />
                  <span>
                    <b>
                      {mod.name} {equipped && "· Equipped"}
                    </b>
                    <small>{mod.primaryEffect}</small>
                  </span>
                  <span className={styles.modDrain}>
                    {mod.drain + mod.maxRank}
                  </span>
                </button>
              );
            })}
            {!compatible.length && <p>No compatible mods match that search.</p>}
          </div>
        </section>
      </div>
      <div className={styles.mobileDock}>
        <button
          onClick={() =>
            document.getElementById("build-results")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            })
          }
          aria-label="View build results"
        >
          <span>{conditional ? "CONDITIONAL DPS" : "BASE DPS"}</span>
          <strong>{number(dps, 0)}</strong>
        </button>
        <button
          className={styles.optimize}
          disabled={!detail || pending}
          onClick={
            optimizing
              ? () => {
                  optimizerController.current?.abort();
                  setOptimizing(false);
                  setNotice("Search cancelled. Your build is unchanged.");
                }
              : optimize
          }
        >
          {optimizing ? (
            <>
              <X size={16} /> Cancel search
            </>
          ) : (
            <>
              <Sparkles size={16} /> Optimize build
            </>
          )}
        </button>
      </div>
      <Dialog
        open={picker === "weapon"}
        onOpenChange={(open) => !open && setPicker(null)}
        title="Choose your weapon"
      >
        <div className={styles.pickerSearch}>
          <Search size={17} />
          <input
            autoFocus
            placeholder="Search weapons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.pickerList}>
          {weapons
            .filter((w) => w.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 70)
            .map((w) => (
              <button key={w.id} onClick={() => choose(w.id)}>
                <ItemImage name={w.name} className="tiny-art" />
                <span>
                  <b>{w.name}</b>
                  <small>{w.category}</small>
                </span>
                <ArrowUpRight size={14} />
              </button>
            ))}
          {!weapons.some((w) =>
            w.name.toLowerCase().includes(query.toLowerCase()),
          ) && <p>No weapons match that search.</p>}
        </div>
      </Dialog>
      <Dialog
        open={arcaneOpen}
        onOpenChange={setArcaneOpen}
        title="Choose weapon arcane"
      >
        <div className={styles.arcaneOptions}>
          <button
            onClick={() => {
              change({ ...build, arcaneIds: [] });
              setArcaneOpen(false);
            }}
          >
            No arcane
          </button>
          {detail?.arcanes.map((a) => (
            <button
              key={a.id}
              aria-pressed={build.arcaneIds?.[0] === a.id}
              onClick={() => {
                change({
                  ...build,
                  arcaneIds: [a.id],
                  scenario: {
                    ...build.scenario,
                    arcaneStacks: conditional ? a.maxStacks : 0,
                  },
                });
                setArcaneOpen(false);
              }}
            >
              <ItemImage kind="arcane" name={a.name} />
              <span>
                <strong>{a.name}</strong>
                <small>{a.description}</small>
                {!a.modeled && <small>Effect unavailable</small>}
              </span>
            </button>
          ))}
        </div>
      </Dialog>{" "}
      <Dialog
        open={saveOpen}
        onOpenChange={setSaveOpen}
        title="Save your build"
      >
        <form
          className={styles.saveForm}
          onSubmit={(e) => {
            e.preventDefault();
            try {
              saveBuild(build, weapon?.name ?? build.weaponId, buildName);
              setSaveOpen(false);
              setNotice("Saved on this device. Find it in My builds.");
            } catch {
              setError(
                "This browser could not save the build. Use Share to keep a copy.",
              );
            }
          }}
        >
          <label>
            Build name
            <input
              autoFocus
              maxLength={100}
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
            />
          </label>
          <p>
            Saved locally on this device. Share a snapshot link to move it
            elsewhere.
          </p>
          <button className={styles.optimize} type="submit">
            <Save size={16} /> Save build
          </button>
        </form>
      </Dialog>
    </div>
  );
}
