"use client";
import { useState } from "react";
import Link from "next/link";
import { ItemImage } from "./item-image";
export function EquipmentDirectory({
  guides,
  initialQuery,
}: {
  initialQuery: string;
  guides: {
    slug: string;
    title: string;
    frame: string;
    subtitle: string;
    content: string;
    role: string;
    category: string;
  }[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const shown = guides.filter((g) =>
    `${g.frame} ${g.title} ${g.content} ${g.role}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div className="wf-search">
        <input
          aria-label="Search equipment builds"
          placeholder="Search equipment, build or mission…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>{shown.length} builds</span>
      </div>
      <div className="wf-directory">
        {shown.map((g) => (
          <Link
            className="wf-guide-tile"
            key={`${g.category}/${g.slug}`}
            href={`/equipment-builds/${g.category}/${g.slug}`}
          >
            <ItemImage
              kind={g.category === "companions" ? "companion" : "weapon"}
              name={g.frame.replace(/ Incarnon$/, "").replace(/ \(.*?\)$/, "")}
            />
            <div>
              <span className="wf-approved">✓ Cephalon approved</span>
              <p className="wf-kicker">{g.frame}</p>
              <h2>{g.title}</h2>
              <p>{g.subtitle}</p>
              <div className="wf-card-tags">
                {g.content.split(/[,·]/).map((t, i) => (
                  <span key={i}>{t.trim()}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!shown.length && <p>No builds match your search.</p>}
    </>
  );
}
