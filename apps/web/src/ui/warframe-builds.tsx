"use client";
import { ConfidenceBadge } from "@/ui";
import { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Crosshair,
  Shield,
  Heart,
  Swords,
  Infinity,
  HandHeart,
  Sword,
  Gem,
  Grid2X2,
} from "lucide-react";
import { FormaCost } from "./forma-cost";
import { ItemImage } from "./item-image";
export function GuideDirectory({
  guides,
  initialQuery,
}: {
  initialQuery: string;
  guides: {
    investment: string;
    formaAudit?: { count: number | null; note: string };
    stats?: Record<string, number>;
    slug: string;
    title: string;
    frame: string;
    subtitle: string;
    role: string;
    content: string;
  }[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState("All");
  const filters = [
    ["All", Grid2X2],
    ["Nuke Frames", Flame],
    ["Weapon platforms", Crosshair],
    ["Shield gate", Shield],
    ["Health tank", Heart],
    ["Steel Path", Swords],
    ["Level cap", Infinity],
    ["Support", HandHeart],
    ["Melee", Sword],
    ["Looting", Gem],
  ] as const;
  const patterns: Record<string, RegExp> = {
    "Nuke Frames": /nuke|area damage|aoe|room clear|ability damage|burst/i,
    "Weapon platforms": /weapon|gun platform|gun buff|self.buff/i,
    "Shield gate": /shield.?gat/i,
    "Health tank":
      /health tank|health.tank|health.based|armor tank|armour tank/i,
    Support: /support|healing|healer|team buff|squad buff/i,
    Melee: /melee|exalted|pseudo.exalted/i,
    Looting: /loot|farm|resource/i,
  };
  const matches = (g: (typeof guides)[number], filter: string) =>
    filter === "All" ||
    (filter === "Steel Path" || filter === "Level cap"
      ? g.content.toLowerCase().includes(filter.toLowerCase())
      : patterns[filter]?.test(`${g.role} ${g.subtitle}`));
  const shown = guides.filter(
    (g) =>
      matches(g, active) &&
      `${g.frame} ${g.title} ${g.role} ${g.content}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div
        className="wf-filter-bar"
        role="group"
        aria-label="Build playstyle filters"
      >
        {filters.map(([name, Icon], i) => (
          <button
            key={name}
            data-tone={i % 5}
            aria-pressed={active === name}
            onClick={() => setActive(name)}
          >
            <Icon size={18} />
            <span>{name}</span>
            <small>{guides.filter((g) => matches(g, name)).length}</small>
          </button>
        ))}
      </div>
      <div className="wf-search">
        <input
          aria-label="Search Warframe builds"
          placeholder="Search Warframe, role or mission…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>{shown.length} builds</span>
      </div>
      <div className="wf-directory">
        {shown.map((g) => (
          <Link
            className="wf-guide-tile wf-guide-tile--chart"
            key={g.slug}
            href={`/warframe-builds/${g.slug}`}
          >
            <ItemImage
              kind="warframe"
              name={g.frame.replace("Sirius and Orion", "Sirius & Orion")}
            />
            {g.stats && (
              <div className="wf-card-radar">
                <StatRadar stats={g.stats} compact />
                <span className="radar-confidence">
                  Guide stats <ConfidenceBadge tag="pending-verification" />
                </span>
              </div>
            )}
            <div>
              <span className="wf-approved">Curated build</span>
              <p className="wf-kicker">{g.frame}</p>
              <h2>{g.title}</h2>
              <FormaCost investment={g.investment} audit={g.formaAudit} />
              <p>{g.subtitle}</p>
              <div className="wf-card-tags">
                {g.content.split(/[,·]/).map((t) => (
                  <span key={t}>{t.trim()}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!shown.length && (
        <p>No builds match. Try a Warframe name or Steel Path.</p>
      )}
    </>
  );
}
export function StatRadar({
  stats,
  compact = false,
}: {
  stats: Record<string, number>;
  compact?: boolean;
}) {
  const labels = ["Strength", "Duration", "Range", "Efficiency"];
  const maximum = Math.max(
    400,
    Math.ceil(Math.max(...labels.map((l) => stats[l] ?? 0)) / 100) * 100,
  );
  const point = (i: number, value: number) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / 2;
    return `${160 + (Math.cos(angle) * 100 * value) / maximum},${145 + (Math.sin(angle) * 100 * value) / maximum}`;
  };
  return (
    <figure className="wf-radar">
      <svg
        viewBox="0 0 320 290"
        role="img"
        aria-label={`Ability stat chart: ${labels.map((l) => `${l} ${Math.round(stats[l] * 10) / 10}%`).join(", ")}. Dashed ring is 100 percent; center is zero.`}
      >
        {Array.from({ length: maximum / 50 }, (_, i) => (i + 1) * 50).map(
          (v) => (
            <polygon
              key={v}
              points={labels.map((_, i) => point(i, v)).join(" ")}
              fill="none"
              stroke={v === 100 ? "#dfc28a" : "#33454f"}
              strokeDasharray={v === 100 ? "4 3" : undefined}
              strokeWidth={v === 100 ? 2 : 1}
            />
          ),
        )}
        {labels.map((l, i) => (
          <line
            key={l}
            x1="160"
            y1="145"
            x2={point(i, maximum).split(",")[0]}
            y2={point(i, maximum).split(",")[1]}
            stroke="#33454f"
          />
        ))}
        <polygon
          data-stat-polygon
          points={labels.map((l, i) => point(i, stats[l] ?? 0)).join(" ")}
          fill="#76c9cf44"
          stroke="#8bd6dc"
          strokeWidth="2"
        />
        {labels.map((l, i) => (
          <g key={l}>
            <circle
              cx={point(i, stats[l] ?? 0).split(",")[0]}
              cy={point(i, stats[l] ?? 0).split(",")[1]}
              r="3"
              fill="#d5f4f4"
            />
            <text
              x={[160, 275, 160, 45][i]}
              y={[22, 143, 268, 143][i]}
              textAnchor="middle"
              fill="#c8dde3"
              fontSize={compact ? "15" : "11"}
            >
              {l}
            </text>
            <text
              x={[160, 275, 160, 45][i]}
              y={[37, 158, 283, 158][i]}
              textAnchor="middle"
              fill="#91ced4"
              fontSize={compact ? "15" : "11"}
            >
              {Math.round(stats[l] * 10) / 10}%
            </text>
          </g>
        ))}
      </svg>
      <figcaption>
        <i /> 100% baseline · center 0% · outer ring {maximum}%
      </figcaption>
    </figure>
  );
}
