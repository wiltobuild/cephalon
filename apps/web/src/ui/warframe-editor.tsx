"use client";
import {
  modCapacityAtRank,
  modSlotCapacityCost,
} from "@cephalon/services/capacity";
import { PolarityIcon, PolarityPicker } from "./polarity";
import { useEffect, useState } from "react";
import { ModCard } from "./mod-card";
import { ItemImage } from "./item-image";
import { StatRadar } from "./warframe-builds";
import { Dialog, ConfidenceBadge, type ConfidenceTag } from "@/ui";
import type { CompatibleMod, ModSlot } from "@/server/contracts";
type Shard = {
  id: string;
  name: string;
  color: string;
  tier: number;
  statBonuses: Record<string, number>;
  description: string;
};
type Choice = { shardId: string; effect: string } | null;
type Stats = {
  confidence?: Record<string, ConfidenceTag>;
  caveats?: string[];
  stats: Record<string, number>;
  pools: Record<string, number>;
  extras?: Record<string, number>;
};
export type EditorProps = {
  form?: "sirius" | "orion";
  warframeId: string;
  initialMods: ModSlot[];
  initialPolarities: Record<number, string | null>;
  mods: (CompatibleMod & { slotKind: string })[];
  shards: Shard[];
  initialShards: Choice[];
  sourceStats: Stats;
  shardText: string;
  auraCount: number;
  arcanes: string[];
};
const label = (s: string) =>
  s.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
export function WarframeEditor(p: EditorProps) {
  const [custom, setCustom] = useState(false),
    [mods, setMods] = useState(p.initialMods),
    [polarities, setPolarities] = useState(p.initialPolarities),
    [shards, setShards] = useState(p.initialShards),
    [include, setInclude] = useState(false),
    [result, setResult] = useState<Stats>(p.sourceStats),
    [pending, setPending] = useState(false),
    [error, setError] = useState(""),
    [pick, setPick] = useState<number | null>(null),
    [shardPick, setShardPick] = useState<number | null>(null),
    [query, setQuery] = useState("");
  useEffect(() => {
    if (!custom && !include) {
      setResult(p.sourceStats);
      setPending(false);
      setError("");
      return;
    }
    const controller = new AbortController();
    setPending(true);
    const timer = setTimeout(
      () =>
        fetch("/api/build/warframe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            warframeId: p.warframeId,
            form: p.form,
            mods,
            shards,
            includeShards: include,
          }),
          signal: controller.signal,
        })
          .then(async (r) => {
            const data = await r.json();
            if (!r.ok) throw new Error(data.error);
            setResult(data);
            setError("");
          })
          .catch((e) => {
            if (e.name !== "AbortError") setError(e.message);
          })
          .finally(() => {
            if (!controller.signal.aborted) setPending(false);
          }),
      120,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [mods, shards, include, custom, p.sourceStats, p.warframeId, p.form]);
  const update = (slotIndex: number, modId: string, rank: number) =>
    setMods((m) => [
      ...m.filter((s) => s.slotIndex !== slotIndex),
      { slotIndex, modId, rank },
    ]);
  const costs = new Map(
    mods.map((entry) => {
      const mod = p.mods.find((m) => m.id === entry.modId);
      return [
        entry.slotIndex,
        mod
          ? modSlotCapacityCost(
              modCapacityAtRank(mod.drain, entry.rank),
              polarities[entry.slotIndex],
              mod.polarity,
            )
          : 0,
      ];
    }),
  );
  const used = [...costs.values()].reduce(
    (sum, cost) => sum + Math.max(0, cost),
    0,
  );
  const auraBonus = [...costs.values()].reduce(
    (sum, cost) => sum - Math.min(0, cost),
    0,
  );
  const total = 60 + auraBonus;
  const unspecified = mods.some((m) => polarities[m.slotIndex] == null);
  const slot = (i: number) => {
    const equipped = mods.find((s) => s.slotIndex === i),
      mod = p.mods.find((m) => m.id === equipped?.modId);
    return (
      <article key={i} data-slot-polarized={Boolean(polarities[i])}>
        <span className="wf-slot">
          {i < 8 ? `${i + 1}` : i === 8 ? "EXILUS" : `AURA ${i - 8}`}
          <span className="wf-polarity-badge">
            <PolarityIcon value={polarities[i] ?? ""} />
            {polarities[i]
              ? "POLARIZED"
              : polarities[i] === null
                ? "UNSPECIFIED"
                : "UNPOLARIZED"}
          </span>
        </span>
        <button
          className="wf-mod-pick"
          disabled={!custom}
          aria-label={`Change Warframe slot ${i + 1}`}
          onClick={() => {
            setPick(i);
            setQuery("");
          }}
        >
          {mod ? (
            <ModCard
              mod={mod}
              rank={equipped!.rank}
              capacityCost={costs.get(i)}
              compact
            />
          ) : (
            <span className="wf-empty">＋ Add mod</span>
          )}
        </button>
        <footer>
          {custom ? (
            <PolarityPicker
              label={`Polarity for Warframe slot ${i + 1}`}
              value={polarities[i] ?? ""}
              onChange={(value) => setPolarities((s) => ({ ...s, [i]: value }))}
            />
          ) : (
            <span className="wf-slot-polarity-caption">
              {polarities[i]
                ? "Polarized slot"
                : polarities[i] === null
                  ? "Polarity not specified"
                  : "Unpolarized slot"}
            </span>
          )}
          {custom && mod ? (
            <>
              <select
                aria-label={`Rank for ${mod.name}`}
                value={equipped!.rank}
                onChange={(e) => update(i, mod.id, Number(e.target.value))}
              >
                {Array.from({ length: mod.maxRank + 1 }, (_, r) => (
                  <option key={r} value={r}>
                    R{r}
                  </option>
                ))}
              </select>
              <button
                aria-label={`Remove ${mod.name}`}
                onClick={() =>
                  setMods((m) => m.filter((s) => s.slotIndex !== i))
                }
              >
                ×
              </button>
            </>
          ) : (
            <strong>{mod ? `R${equipped!.rank}` : ""}</strong>
          )}
        </footer>
      </article>
    );
  };
  const selected = shardPick === null ? null : shards[shardPick];
  const shard = p.shards.find((s) => s.id === selected?.shardId);
  return (
    <>
      <div className="wf-edit-toolbar">
        <span>{custom ? "CUSTOM BUILD · UNSAVED" : "CURATED LOADOUT"}</span>
        <button
          onClick={() => {
            if (custom) {
              setMods(p.initialMods);
              setPolarities(p.initialPolarities);
              setShards(p.initialShards);
              setInclude(false);
            }
            setCustom((c) => !c);
          }}
        >
          {custom ? "Reset to curated build" : "Customize build"}
        </button>
      </div>
      {error && <p role="alert">{error} Displaying the last valid stats.</p>}
      <div className="wf-layout wf-edit-layout">
        <aside>
          <section className="wf-stats" aria-busy={pending}>
            <h2>BUILD PERFORMANCE</h2>
            <div className="wf-numbered">
              {Object.entries(result.stats).map(([k, v]) => (
                <div key={k}>
                  <span>{k}</span>
                  <ConfidenceBadge
                    tag={result.confidence?.[k] ?? "pending-verification"}
                  />
                  <strong data-warframe-stat={k}>
                    {Math.round(v * 10) / 10}%
                  </strong>
                </div>
              ))}
            </div>
            <StatRadar stats={result.stats} />
            <p className="confidence-note">
              {custom || include
                ? "Ability parameters are approximations; pool labels use the calculation service."
                : "Imported guide figures · pending verification."}
            </p>
            {result.caveats?.map((c) => (
              <p className="confidence-note" key={c}>
                <ConfidenceBadge tag="approximation" /> {c}
              </p>
            ))}
            <div className="wf-pools">
              {Object.entries(result.pools).map(([k, v]) => (
                <div key={k}>
                  <span>{k}</span>
                  <ConfidenceBadge
                    tag={result.confidence?.[k] ?? "pending-verification"}
                  />
                  <strong>{Math.round(v).toLocaleString()}</strong>
                </div>
              ))}
              {Object.entries(result.extras ?? {})
                .filter(([, v]) => v !== 0)
                .map(([k, v]) => (
                  <div key={k}>
                    <span>{k}</span>
                    <ConfidenceBadge
                      tag={result.confidence?.[k] ?? "pending-verification"}
                    />
                    <strong>
                      {Math.round(v * 10) / 10}
                      {k.includes("/s") ? "" : "%"}
                    </strong>
                  </div>
                ))}
            </div>
            <small>
              {custom || include
                ? "Live mod and shard stats"
                : "Guide arsenal stats"}
              {pending ? " · Updating…" : ""}
            </small>
          </section>
          <section className="wf-shards wf-shard-tray">
            <h2>ARCHON SHARDS</h2>
            <div className="wf-five-shards">
              {shards.map((s, i) => {
                const def = p.shards.find((d) => d.id === s?.shardId);
                return (
                  <button
                    key={i}
                    aria-label={`Shard ${i + 1}: ${def?.name ?? "Flexible"}`}
                    title={s ? label(s.effect) : "Choose a color and effect"}
                    onClick={() => setShardPick(i)}
                  >
                    {def ? (
                      <ItemImage kind="shard" name={def.name} />
                    ) : (
                      <span className="wf-flex-shard">◇</span>
                    )}
                    <small>
                      {def?.tier === 2 ? "TAU" : (def?.color ?? "FLEX")}
                    </small>
                  </button>
                );
              })}
            </div>
            <label className="wf-shard-toggle">
              <input
                type="checkbox"
                role="switch"
                aria-label="Include shards in stats"
                checked={include}
                onChange={(e) => setInclude(e.target.checked)}
              />{" "}
              Include shards in stats
            </label>
            <details>
              <summary>Shard recommendations</summary>
              <p>{p.shardText}</p>
            </details>
          </section>
        </aside>
        <section className="wf-configuration">
          <div className="wf-section-title">
            <h2>CONFIGURATION</h2>
            <span>
              {custom
                ? "Select a slot to replace its mod"
                : "Customize to edit mods"}
            </span>
          </div>
          <section
            className="wf-capacity"
            data-over-capacity={used > total}
            aria-label="Mod capacity"
          >
            <div>
              <h3>MOD CAPACITY</h3>
              <strong data-capacity-total>
                {used} / {total}
              </strong>
              <span>
                {used > total
                  ? `${used - total} over capacity`
                  : `${total - used} remaining`}
              </span>
            </div>
            <meter
              min={0}
              max={total}
              value={Math.min(used, total)}
              aria-label="Used capacity"
            />
            <p>
              Rank 30 · Orokin Reactor · 60 base + {auraBonus} aura capacity
            </p>
            {unspecified && (
              <small>
                Unspecified slot polarities are counted as unpolarized.
              </small>
            )}
          </section>
          <div className="wf-upper-loadout" data-double-aura={p.auraCount > 1}>
            <div className="wf-mod-grid wf-aura-grid">
              {Array.from({ length: p.auraCount }, (_, i) => slot(9 + i))}
              {slot(8)}
            </div>
            <section className="wf-arcane-stack" aria-label="Equipped arcanes">
              {p.arcanes.filter(Boolean).map((a) => (
                <div key={a}>
                  <ItemImage
                    kind="arcane"
                    name={a.replace(/\s*\(.*?\)/g, "")}
                  />
                  <span>{a}</span>
                </div>
              ))}
            </section>
          </div>
          <div className="wf-mod-grid">
            {Array.from({ length: 8 }, (_, i) => slot(i))}
          </div>
          {custom && (
            <section className="wf-mod-collection">
              <h2>MOD COLLECTION</h2>
              <input
                aria-label="Search Warframe mods"
                placeholder="Search compatible mods…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <p>
                {pick === null
                  ? "Select a slot above."
                  : `Replacing slot ${pick + 1}`}
              </p>
              <div>
                {p.mods
                  .filter(
                    (m) =>
                      (pick !== null && pick >= 9
                        ? m.slotKind === "aura"
                        : pick === 8
                          ? m.slotKind === "exilus"
                          : m.slotKind !== "aura") &&
                      m.name.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((m) => (
                    <button
                      key={m.id}
                      disabled={
                        pick === null ||
                        mods.some(
                          (s) => s.modId === m.id && s.slotIndex !== pick,
                        )
                      }
                      onClick={() => {
                        update(pick!, m.id, m.maxRank);
                        setPick(null);
                      }}
                    >
                      <ModCard mod={m} compact />
                    </button>
                  ))}
              </div>
            </section>
          )}
        </section>
      </div>
      <Dialog
        open={shardPick !== null}
        onOpenChange={(open) => !open && setShardPick(null)}
        title={`Choose shard ${shardPick === null ? "" : shardPick + 1}`}
      >
        <div className="wf-shard-picker">
          <div className="wf-color-options">
            {["amber", "crimson", "azure", "emerald", "topaz", "violet"].map(
              (color) => (
                <button
                  key={color}
                  aria-label={label(color)}
                  aria-pressed={shard?.color === color}
                  onClick={() => {
                    const d = p.shards.find(
                      (s) => s.color === color && s.tier === (shard?.tier ?? 1),
                    )!;
                    setShards((s) =>
                      s.map((x, i) =>
                        i === shardPick
                          ? {
                              shardId: d.id,
                              effect: Object.keys(d.statBonuses)[0],
                            }
                          : x,
                      ),
                    );
                  }}
                >
                  <ItemImage
                    kind="shard"
                    name={`${label(color)} Archon Shard`}
                  />
                  {label(color)}
                </button>
              ),
            )}
          </div>
          {shard && (
            <>
              <label>
                <input
                  type="checkbox"
                  aria-label="Tauforged shard"
                  checked={shard.tier === 2}
                  onChange={(e) => {
                    const d = p.shards.find(
                      (s) =>
                        s.color === shard.color &&
                        s.tier === (e.target.checked ? 2 : 1),
                    )!;
                    setShards((s) =>
                      s.map((x, i) =>
                        i === shardPick
                          ? { shardId: d.id, effect: selected!.effect }
                          : x,
                      ),
                    );
                  }}
                />{" "}
                Tauforged
              </label>
              <label>
                Effect
                <select
                  aria-label="Shard effect"
                  value={selected!.effect}
                  onChange={(e) =>
                    setShards((s) =>
                      s.map((x, i) =>
                        i === shardPick
                          ? { shardId: shard.id, effect: e.target.value }
                          : x,
                      ),
                    )
                  }
                >
                  {Object.entries(shard.statBonuses).map(([k, v]) => (
                    <option key={k} value={k}>
                      {label(k)} +{v}
                    </option>
                  ))}
                </select>
              </label>
              <p>{shard.description}</p>
            </>
          )}
          <button
            onClick={() => {
              setShards((s) => s.map((x, i) => (i === shardPick ? null : x)));
              setShardPick(null);
            }}
          >
            Clear to flexible
          </button>
          <button onClick={() => setShardPick(null)}>Done</button>
        </div>
      </Dialog>
    </>
  );
}
