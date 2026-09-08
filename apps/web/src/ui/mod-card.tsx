"use client";
import type { CompatibleMod } from "@/server/contracts";
import { ItemImage } from "./item-image";
import Image from "next/image";
import { useState } from "react";
import "./mod-card.css";

const symbols: Record<string, string> = {
  madurai: "Ⅴ",
  vazarin: "Ｄ",
  naramon: "−",
  zenurik: "＝",
  umbra: "Ｕ",
  penjaga: "Ｙ",
};
export function ModCard({
  mod,
  rank = mod.maxRank,
  compact = false,
}: {
  mod: CompatibleMod;
  rank?: number;
  compact?: boolean;
}) {
  const [failedCard, setFailedCard] = useState<string | null>(null);
  const exactRank = mod.rankText?.[rank];
  const effect = (exactRank ?? mod.primaryEffect)
    .replace(/<[^>]+>/g, "")
    .replace(/\\n/g, "\n");
  return (
    <span
      className={`game-mod-card rarity-${mod.rarity}${compact ? " is-compact" : ""}${mod.name.startsWith("Primed ") ? " is-primed" : ""}`}
    >
      {rank === mod.maxRank && failedCard !== mod.id && (
        <span className="original-mod-card">
          <Image
            src={`/api/item-image?kind=mod-card&name=${encodeURIComponent(mod.name)}`}
            alt={`${mod.name} mod card`}
            fill
            unoptimized
            sizes="220px"
            onError={() => setFailedCard(mod.id)}
          />
        </span>
      )}
      <span className="game-mod-capacity">
        <b>{mod.drain + rank}</b>
        <span aria-label={`${mod.polarity} polarity`}>
          {symbols[mod.polarity] ?? "◇"}
        </span>
      </span>
      <span className="game-mod-art">
        <ItemImage name={mod.name} kind="mod" />
      </span>
      <span className="game-mod-title">{mod.name}</span>
      <span className="game-mod-effect">{effect}</span>
      <span
        className="game-mod-rank"
        aria-label={`Rank ${rank} of ${mod.maxRank}`}
      >
        {Array.from({ length: mod.maxRank }, (_, i) => (
          <i key={i} data-active={i < rank} />
        ))}
      </span>
      <span className="game-mod-caption">
        RANK {rank}/{mod.maxRank}
        {!exactRank && rank < mod.maxRank ? " · TEXT AT MAX RANK" : ""}
      </span>
      <span className="game-mod-tooltip" role="tooltip">
        <b>{mod.name}</b>
        <span>{effect}</span>
        <small>
          {exactRank ? `Effects at rank ${rank}` : "Effects shown at max rank"}{" "}
          · {mod.drain + rank} base drain
        </small>
      </span>
    </span>
  );
}
