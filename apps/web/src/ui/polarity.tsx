import Image from "next/image";
import "./polarity.css";

/** Canonical polarity key -> bundled glyph in /public/polarities (game art, white). */
const FILE: Record<string, string> = {
  madurai: "madurai",
  vazarin: "vazarin",
  naramon: "naramon",
  zenurik: "zenurik",
  unairu: "unairu",
  penjaga: "penjaga",
  umbra: "umbra",
  umbral: "umbra",
  any: "any",
  universal: "any",
  omni: "any",
  aura: "any",
};

const LABEL: Record<string, string> = {
  madurai: "Madurai",
  vazarin: "Vazarin",
  naramon: "Naramon",
  zenurik: "Zenurik",
  unairu: "Unairu",
  penjaga: "Penjaga",
  umbra: "Umbral",
  any: "Universal",
};

/** Normalises the many polarity spellings in the data ("Zenurik", "madurai",
 *  "Naramon polarity", "unpolarised", "◇", "") to a glyph key, or null. */
export function polarityKey(raw?: string | null): string | null {
  if (!raw) return null;
  const k = raw
    .trim()
    .toLowerCase()
    .replace(/\s*polarity$/, "")
    .replace(/\s*slot$/, "");
  if (
    !k ||
    k === "none" ||
    k === "unpolarised" ||
    k === "unpolarized" ||
    k === "◇"
  )
    return null;
  return FILE[k] ?? null;
}

/** Renders the real in-game polarity symbol. Falls back to a neutral ◇ for
 *  unpolarised / unknown slots. */
export function Polarity({
  polarity,
  size = 14,
  className = "",
}: {
  polarity?: string | null;
  size?: number;
  className?: string;
}) {
  const key = polarityKey(polarity);
  if (!key)
    return (
      <span
        className={`polarity-icon is-none ${className}`.trim()}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        ◇
      </span>
    );
  const label = LABEL[key] ?? key;
  return (
    <Image
      className={`polarity-icon ${className}`.trim()}
      src={`/polarities/${key}.png`}
      alt={`${label} polarity`}
      title={`${label} polarity`}
      width={size}
      height={size}
      unoptimized
    />
  );
}
