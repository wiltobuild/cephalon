"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { ItemImage } from "./item-image";
type Tier = {
  tier: string;
  title: string;
  intro: string[];
  notes: string[];
  frames: {
    name: string;
    rank: number | null;
    justification: string;
    buildCount: number;
  }[];
};
export function WarframeTierList({ tiers }: { tiers: Tier[] }) {
  const [query, setQuery] = useState("");
  const shown = tiers.map((t) => ({
    ...t,
    frames: t.frames.filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase().trim()),
    ),
  }));
  const count = shown.reduce((n, t) => n + t.frames.length, 0);
  return (
    <>
      <div className="tier-controls">
        <nav aria-label="Jump to tier">
          {tiers.map((t) => (
            <a
              key={t.tier}
              href={`#tier-${t.tier.replace("+", "plus")}`}
              data-tier={t.tier}
            >
              <b>{t.tier}</b>
              <span>{t.frames.length} frames</span>
            </a>
          ))}
        </nav>
        <label className="tier-search">
          <Search size={18} />
          <input
            aria-label="Search tier list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a Warframe…"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear tier search">
              ×
            </button>
          )}
          <span aria-live="polite">{count} frames</span>
        </label>
      </div>
      {shown.map((t) => (
        <section
          key={t.tier}
          id={`tier-${t.tier.replace("+", "plus")}`}
          className="tier-section"
          data-tier={t.tier}
          aria-labelledby={`heading-${t.tier}`}
          hidden={!t.frames.length}
        >
          <header className="tier-heading">
            <span className="tier-emblem" aria-hidden="true">
              {t.tier}
            </span>
            <div>
              <p>{t.tier} TIER</p>
              <h2 id={`heading-${t.tier}`}>{t.title}</h2>
              {t.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </header>
          <div className="tier-grid">
            {t.frames.map((f) => (
              <article className="tier-card" key={f.name}>
                <Link
                  className="tier-card-link"
                  href={`/warframe-builds?frame=${encodeURIComponent(f.name)}`}
                  aria-label={`${f.name}: view ${f.buildCount} available builds`}
                >
                  <div className="tier-portrait">
                    {f.rank !== null && (
                      <span className="tier-rank">
                        #{String(f.rank).padStart(2, "0")}
                      </span>
                    )}
                    <ItemImage kind="warframe" name={f.name} />
                    <span className="tier-card-mark" aria-hidden="true">
                      ✧
                    </span>
                  </div>
                  <div className="tier-card-title">
                    <h3>{f.name}</h3>
                    <ArrowUpRight size={20} />
                  </div>
                  <span className="tier-build-count">
                    {f.buildCount
                      ? `${f.buildCount} available build${f.buildCount === 1 ? "" : "s"}`
                      : "No builds published yet"}
                  </span>
                  <p className="tier-justification">{f.justification}</p>
                </Link>
              </article>
            ))}
          </div>
          {t.notes.length > 0 && (
            <aside className="tier-notes" aria-label={`${t.tier} tier notes`}>
              {t.notes.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </aside>
          )}
        </section>
      ))}
      {!count && (
        <div className="tier-empty">
          <h2>No Warframes found.</h2>
          <p>Try a frame name, such as Wisp or Dante.</p>
          <button onClick={() => setQuery("")}>Show all frames</button>
        </div>
      )}
    </>
  );
}
