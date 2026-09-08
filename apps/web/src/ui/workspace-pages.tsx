"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Crosshair,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Dialog } from "@/ui";
import { ItemImage } from "./item-image";
import {
  buildFragment,
  deleteBuild,
  readBuilds,
  type SavedBuild,
} from "./build-storage";
import type { BuildWeaponResponse } from "@/server/contracts";
import "./workspace.css";

const featured = [
  { id: "braton_prime", name: "Braton Prime", tag: "RIFLE" },
  { id: "soma_prime", name: "Soma Prime", tag: "RIFLE" },
  { id: "lex_prime", name: "Lex Prime", tag: "SECONDARY" },
  { id: "hek", name: "Hek", tag: "SHOTGUN" },
];
export function Overview() {
  const [saved, setSaved] = useState<SavedBuild[]>([]);
  useEffect(() => setSaved(readBuilds()), []);
  return (
    <div className="workspace-page">
      <div className="workspace-kicker">
        <span className="status-dot" /> WELCOME TO YOUR ARSENAL
      </div>
      <section className="welcome">
        <div className="welcome-copy">
          <p>KNOW YOUR GEAR. FIND YOUR EDGE.</p>
          <h1>
            Your Warframe
            <br />
            <em>companion.</em>
          </h1>
          <div className="welcome-description">
            Explore your gear, understand your mods, and keep your favorite
            builds together. Your arsenal is just the beginning.
          </div>
          <Link className="primary-link" href="/arsenal">
            Explore your arsenal <ArrowUpRight size={18} />
          </Link>
          <span className="welcome-note">
            Warframes. Weapons. Mods. Your next idea.
          </span>
        </div>
        <div className="welcome-art">
          <ItemImage name="Wisp Prime" kind="warframe" priority />
          <div className="welcome-caption">
            WISP PRIME <span>THE ARSENAL AWAITS</span>
          </div>
        </div>
      </section>
      <div className="workspace-section-title">
        <h2>START WITH A WEAPON</h2>
        <Link href="/arsenal">
          Explore the arsenal <ArrowRight size={13} />
        </Link>
      </div>
      <div className="featured-grid">
        {featured.map((w, index) => (
          <Link
            className="gear-tile"
            href={`/tools/weapon-builder?weapon=${w.id}`}
            key={w.id}
          >
            <span className="tile-index">
              0{index + 1} / {w.tag}
            </span>
            <ItemImage name={w.name} />
            <div>
              <h3>{w.name}</h3>
              <ArrowUpRight size={17} />
            </div>
            <p>Make it yours</p>
          </Link>
        ))}
      </div>
      <section className="workspace-bottom">
        <div>
          <div className="workspace-section-title">
            <h2>PICK UP WHERE YOU LEFT OFF</h2>
            <Link href="/builds">
              My builds <ArrowRight size={13} />
            </Link>
          </div>
          {saved.length ? (
            saved.slice(0, 3).map((s) => (
              <Link
                className="recent-build"
                key={s.id}
                href={`/tools/weapon-builder#build=${buildFragment(s.build)}`}
              >
                <ItemImage name={s.weaponName} className="tiny-art" />
                <span>
                  {s.name}
                  <small>
                    {s.build.modSlots.length} mods · saved on this device
                  </small>
                </span>
                <ArrowUpRight size={15} />
              </Link>
            ))
          ) : (
            <div className="workspace-empty">
              <Bookmark size={22} />
              <h3>Your first build starts here.</h3>
              <p>
                Save a configuration and come back to it anytime. No account
                needed.
              </p>
            </div>
          )}
        </div>
        <div className="principles">
          <SlidersHorizontal size={22} />
          <h3>Know what you equip.</h3>
          <p>
            Look up Warframes, browse mods and Archon Shards, or work on a
            weapon build. Cephalon brings your gear into one workspace.
          </p>
          <Link href="/arsenal">
            Browse your gear <ArrowUpRight size={13} />
          </Link>
          <div className="principle-note">
            <ShieldCheck size={14} /> Model assumptions stay visible.
          </div>
        </div>
      </section>
    </div>
  );
}
type ArsenalItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  kind: string;
};
export function Arsenal() {
  const [kind, setKind] = useState("weapon"),
    [query, setQuery] = useState(""),
    [items, setItems] = useState<ArsenalItem[]>([]),
    [selected, setSelected] = useState<ArsenalItem | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [limit, setLimit] = useState(48);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`/api/arsenal?kind=${kind}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Arsenal unavailable. Please try again.");
        return r.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [kind]);
  const shown = items.filter((i) =>
    `${i.name} ${i.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="workspace-page">
      <div className="workspace-kicker">YOUR NEXT POSSIBILITY</div>
      <div className="page-heading">
        <div>
          <h1>Explore the arsenal.</h1>
          <p>Find your gear. Understand it. Build something better.</p>
        </div>
        <Crosshair size={30} strokeWidth={1} />
      </div>
      <div className="arsenal-tabs" role="group" aria-label="Item category">
        {[
          ["weapon", "Weapons"],
          ["warframe", "Warframes"],
          ["mod", "Mods"],
          ["shard", "Archon shards"],
          ["forma", "Forma"],
        ].map(([key, label]) => (
          <button
            key={key}
            aria-pressed={kind === key}
            onClick={() => {
              setKind(key);
              setQuery("");
              setLimit(48);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="arsenal-search">
        <Search size={17} />
        <input
          aria-label="Search arsenal"
          placeholder={`Search ${kind === "shard" ? "shards" : kind + "s"}…`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(48);
          }}
        />
        <span>{loading ? "Loading…" : `${shown.length} ITEMS`}</span>
      </div>
      {error && <p role="alert">{error}</p>}
      {loading ? (
        <div className="workspace-empty">Loading your arsenal…</div>
      ) : (
        <>
          <div className="arsenal-grid">
            {shown.slice(0, limit).map((item) => (
              <button
                className="gear-tile"
                key={item.id}
                onClick={() => setSelected(item)}
              >
                <span className="tile-index">{item.category}</span>
                <ItemImage name={item.name} kind={item.kind} />
                <div>
                  <h3>{item.name}</h3>
                  <ArrowUpRight size={15} />
                </div>
              </button>
            ))}
          </div>
          {shown.length === 0 && (
            <div className="workspace-empty">
              No matches. Try another name or category.
            </div>
          )}
          {shown.length > limit && (
            <button
              className="secondary-link"
              onClick={() => setLimit((n) => n + 48)}
            >
              Show more items
            </button>
          )}
        </>
      )}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        title={selected?.name ?? "Item details"}
      >
        {selected && (
          <div className="item-inspection">
            <ItemImage name={selected.name} kind={selected.kind} />
            <span className="workspace-kicker">{selected.category}</span>
            <p>{selected.description}</p>
            {selected.kind === "warframe" && <Link className="primary-link" href={`/warframe-builds?q=${encodeURIComponent(selected.name.replace(/ Prime$/, ""))}`}>View Warframe builds <ArrowUpRight size={17}/></Link>}
            {selected.kind === "weapon" && (
              <Link
                className="primary-link"
                href={`/tools/weapon-builder?weapon=${encodeURIComponent(selected.id)}`}
              >
                Build this weapon <ArrowUpRight size={17} />
              </Link>
            )}
            <a
              className="source-link"
              href={`https://wiki.warframe.com/w/${encodeURIComponent(selected.name.replaceAll(" ", "_"))}`}
              target="_blank"
              rel="noreferrer"
            >
              Read mechanics & acquisition on the Wiki{" "}
              <ArrowUpRight size={13} />
            </a>
          </div>
        )}
      </Dialog>
    </div>
  );
}
export function MyBuilds() {
  const [saved, setSaved] = useState<SavedBuild[]>([]),
    [selection, setSelection] = useState<string[]>([]),
    [comparison, setComparison] = useState<BuildWeaponResponse[]>([]),
    [error, setError] = useState(""),
    [pending, setPending] = useState(false);
  useEffect(() => setSaved(readBuilds()), []);
  async function compare() {
    const pair = selection.map((id) => saved.find((s) => s.id === id)!);
    if (pair.length !== 2) return;
    setPending(true);
    setError("");
    setComparison([]);
    try {
      const results = await Promise.all(
        pair.map(async (s) => {
          const response = await fetch("/api/build/weapon", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...s.build,
              scenario: pair[0].build.scenario,
            }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          return data as BuildWeaponResponse;
        }),
      );
      setComparison(results);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="workspace-page">
      <div className="workspace-kicker">YOUR CONFIGURATIONS</div>
      <div className="page-heading">
        <div>
          <h1>Good builds deserve a home.</h1>
          <p>Saved on this device. Open, compare, or share a snapshot.</p>
        </div>
        <Link className="primary-link" href="/tools/weapon-builder">
          New build <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="builds-controls">
        <span>{saved.length} SAVED BUILDS</span>
        <button
          className="secondary-link"
          disabled={selection.length !== 2 || pending}
          onClick={compare}
        >
          {pending ? "Comparing…" : "Compare selected builds"}
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      {!saved.length && (
        <div className="workspace-empty">
          <Bookmark size={28} />
          <h3>A place for your best ideas.</h3>
          <p>
            Use Save in the weapon builder to keep your first configuration.
          </p>
          <Link className="source-link" href="/tools/weapon-builder">
            Start a build <ArrowRight size={14} />
          </Link>
        </div>
      )}
      <div className="saved-grid">
        {saved.map((s) => (
          <article className="saved-card" key={s.id}>
            <div className="saved-actions">
              <label>
                <input
                  type="checkbox"
                  disabled={!selection.includes(s.id) && selection.length === 2}
                  checked={selection.includes(s.id)}
                  onChange={() => {
                    setSelection((ids) =>
                      ids.includes(s.id)
                        ? ids.filter((id) => id !== s.id)
                        : [...ids, s.id],
                    );
                    setComparison([]);
                  }}
                />{" "}
                Compare
              </label>
              <button
                aria-label={`Delete ${s.name}`}
                onClick={() => {
                  try {
                    deleteBuild(s.id);
                    setSaved(readBuilds());
                    setSelection((ids) => ids.filter((id) => id !== s.id));
                    setComparison([]);
                  } catch {
                    setError("Could not update local storage.");
                  }
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <Link
              href={`/tools/weapon-builder#build=${buildFragment(s.build)}`}
            >
              <ItemImage name={s.weaponName} />
              <h3>{s.name}</h3>
              <p>
                {s.weaponName} · {s.build.modSlots.length} mods
              </p>
              <span className="source-link">
                Open configuration <ArrowUpRight size={13} />
              </span>
            </Link>
          </article>
        ))}
      </div>
      {comparison.length === 2 && (
        <section className="comparison-panel">
          <h2>Build comparison</h2>
          <p>
            Both builds recalculated using the first selected build's scenario.
            Damage values are model outputs.
          </p>
          <div className="compare-table">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  {selection.map((id) => (
                    <th key={id}>{saved.find((s) => s.id === id)?.name}</th>
                  ))}
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "sustainedDps",
                  "burstDps",
                  "criticalChance",
                  "statusChance",
                ].map((key) => {
                  const rows = comparison.map((c) =>
                    c.stats.find((s) => s.key === key)!,
                  );
                  const pct = key.endsWith("Chance");
                  const format = (v: number) =>
                    `${(v * (pct ? 100 : 1)).toLocaleString("en-US", { maximumFractionDigits: 1 })}${pct ? "%" : ""}`;
                  return (
                    <tr key={key}>
                      <td>{rows[0].label}</td>
                      <td>{format(rows[0].value)}</td>
                      <td>{format(rows[1].value)}</td>
                      <td>{format(rows[1].value - rows[0].value)}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td>Capacity used</td>
                  {comparison.map((c, i) => (
                    <td key={i}>{c.capacityUsed}</td>
                  ))}
                  <td>
                    {comparison[1].capacityUsed - comparison[0].capacityUsed}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
export function Mechanics() {
  return (
    <div className="workspace-page mechanics-page">
      <div className="workspace-kicker">TRUST THROUGH TRANSPARENCY</div>
      <div className="page-heading">
        <div>
          <h1>Know what the numbers mean.</h1>
          <p>Useful calculations start with visible assumptions.</p>
        </div>
        <ShieldCheck size={32} strokeWidth={1} />
      </div>
      <section className="mechanics-section">
        <h2>What you can use today</h2>
        <p>
          Build ordinary weapons, configure mod ranks and slot polarities,
          compare model damage, and run a build search with damage,
          faction, and investment constraints. Save locally or share a versioned
          snapshot.
        </p>
        <div className="coverage-row">
          <Check size={16} />
          <span>Build validation</span>
          <p>
            Compatible mods, duplicate and exclusion checks, ranks, ordered
            slots, and configured capacity.
          </p>
        </div>
        <div className="coverage-row">
          <Check size={16} />
          <span>Expected-value damage</span>
          <p>
            Damage, multishot, critical and status statistics use the bundled
            engine. Regression coverage does not mean independent live-game
            confirmation.
          </p>
        </div>
        <div className="coverage-row">
          <SlidersHorizontal size={16} />
          <span>Best-found optimization</span>
          <p>
            Bounded beam search over a ranked candidate pool; maximum rank, two
            below maximum, and rank zero. It is repeatable, not a proof of
            global optimality. Base-form primary/secondary weapons only.
          </p>
        </div>
      </section>
      <section className="mechanics-section">
        <h2>Where care is needed</h2>
        <p>
          Enemy TTK uses legacy resistance tables and approximate scaling.
          Overguard, special defenses, and some enemy-specific mechanics are not
          modeled. Results must not be treated as current-game kill-time
          predictions. A displayed “&gt; 600 s” means no kill within the
          simulation horizon.
        </p>
        <p>
          General-use search uses one fixed build against four equally weighted
          representative factions and excludes faction mods. It does not
          represent every enemy or mission. Forma counts are additional standard
          Forma relative to the polarities you enter. Inventory, installed
          upgrades, Rivens, and active Incarnon forms are not inferred.
        </p>
        <p>
          Warframe and shard catalog views are references. Full frame/loadout
          optimization and offensive shard coverage require further
          implementation and validation.
        </p>
      </section>
      <section className="mechanics-section">
        <h2>Sources & artwork</h2>
        <p>
          Game artwork is owned by Digital Extremes. Cephalon is an unofficial
          companion, with independent branding. Item imagery is resolved through
          WFCD's public item metadata and documented CDN. Missing or ambiguous
          artwork has a visible fallback; it never changes calculation data.
        </p>
        <div className="source-links">
          <a
            href="https://github.com/WFCD/warframe-items"
            target="_blank"
            rel="noreferrer"
          >
            WFCD item metadata <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.warframe.com/en/patch-notes/switch/36-0-0"
            target="_blank"
            rel="noreferrer"
          >
            DE faction resistance changes <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.warframe.com/en/contentpolicy"
            target="_blank"
            rel="noreferrer"
          >
            DE content policy <ArrowUpRight size={14} />
          </a>
          <a
            href="https://github.com/wiltobuild/cephalon"
            target="_blank"
            rel="noreferrer"
          >
            Source code · AGPL-3.0 <ArrowUpRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
