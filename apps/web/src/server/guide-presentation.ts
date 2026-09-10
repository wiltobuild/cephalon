import type { Guide } from "./guide-types";
export function cleanGuideText(text: string): string {
  return text
    .replace(/\([^)]*\bauthor[’'s]*\b[^)]*\)/gi, "")
    .split(/(?<=[.!?])\s+|\n\s*\n/)
    .filter((part) => !/\bauthor(?:[’']s)?\b|confidence\s*:/i.test(part))
    .join("\n\n")
    .trim();
}
export function presentGuide(g: Guide): Guide {
  return {
    ...g,
    summary: cleanGuideText(g.summary),
    subtitle: cleanGuideText(g.subtitle),
    statText: cleanGuideText(g.statText),
    sections: g.sections
      .filter((s) => !/author|confidence/i.test(s.title))
      .map((s) => ({ ...s, text: cleanGuideText(s.text) }))
      .filter((s) => s.text),
    mods: g.mods.map((m) => ({ ...m, note: cleanGuideText(m.note) })),
  };
}
