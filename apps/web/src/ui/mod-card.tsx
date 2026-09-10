"use client";
import { modCapacityAtRank } from "@cephalon/services/capacity";
import { PolarityIcon } from "./polarity";
import type { CompatibleMod } from "@/server/contracts";
import { ItemImage } from "./item-image";
import Image from "next/image";
import { useState } from "react";
import "./mod-card.css";

export function ModCard({
  mod,
  rank = mod.maxRank,
  compact = false,
  capacityCost,
}: {
  mod: CompatibleMod;
  rank?: number;
  compact?: boolean;
  capacityCost?: number;
}) {
  const [failedCard, setFailedCard] = useState<string | null>(null);
  const baseCost = modCapacityAtRank(mod.drain, rank);
  const cost = capacityCost ?? baseCost;
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
        <b>{cost < 0 ? `+${-cost}` : cost}</b>
        <span aria-label={`${mod.polarity} polarity`}>
          <PolarityIcon value={mod.polarity} />
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
          ·{" "}
          {baseCost < 0
            ? `+${-baseCost} base capacity`
            : `${baseCost} base drain`}
        </small>
      </span>
    </span>
  );
}
