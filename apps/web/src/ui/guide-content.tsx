import { slotPolarity } from "@/server/guide-polarities";
import { PolarityIcon } from "./polarity";
import { catalog } from "@/server/services";
import { ModCard } from "./mod-card";
import { ItemImage } from "./item-image";
import type { Guide } from "@/server/guide-types";
export function RichText({ text }: { text: string }) {
  return (
    <div className="wf-prose">
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>
            {p
              .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
              .map((t, j) =>
                t.startsWith("**") ? (
                  <strong key={j}>{t.slice(2, -2)}</strong>
                ) : t.startsWith("*") ? (
                  <em key={j}>{t.slice(1, -1)}</em>
                ) : (
                  t
                ),
              )}
          </p>
        ))}
    </div>
  );
}
export function GuideLoadout({ guide: g }: { guide: Guide }) {
  const modCatalog = [...catalog.getModMap().values()];
  return (
    <section className="guide-loadout">
      <div className="wf-section-title">
        <h2>CONFIGURATION</h2>
        <span>{g.mods.length} equipped mods</span>
      </div>
      <div className="guide-mods">
        {g.mods.map((m, i) => (
          <article
            key={i}
            data-slot-polarized={Boolean(slotPolarity(m.polarity))}
          >
            {(() => {
              const mod = modCatalog.find((mod) => mod.name === m.name);
              return mod ? (
                <ModCard
                  mod={{
                    id: mod.id,
                    name: mod.name,
                    rarity: mod.rarity,
                    polarity: mod.polarity,
                    maxRank: mod.maxRank,
                    drain: mod.drain,
                    primaryEffect: mod.description ?? m.note,
                  }}
                  rank={m.rank}
                  compact
                />
              ) : (
                <ItemImage kind="mod-card" name={m.name} />
              );
            })()}
            <div>
              <small>
                SLOT {i + 1} · RANK {m.rank}
              </small>
              <h3>{m.name}</h3>
              <span className="guide-polarity">
                <PolarityIcon value={m.polarity} />{" "}
                {slotPolarity(m.polarity)
                  ? "Polarized slot"
                  : slotPolarity(m.polarity) === null
                    ? "Polarity unspecified"
                    : "Unpolarized slot"}
              </span>
              <p>{m.note}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="wf-tags">
        {[
          ...g.auras.map((a) => `Aura: ${a}`),
          g.exilus && `Exilus: ${g.exilus}`,
          g.stance && `Stance: ${g.stance}`,
        ]
          .filter(Boolean)
          .map((t) => (
            <span key={t}>{t}</span>
          ))}
      </div>
    </section>
  );
}
export function GuideSections({ guide: g }: { guide: Guide }) {
  return (
    <section className="wf-guide">
      <header>
        <p className="wf-kicker">CEPHALON FIELD GUIDE</p>
        <h2>How to play this build.</h2>
        <blockquote>{g.summary}</blockquote>
      </header>
      <nav aria-label="Guide sections">
        {g.sections.map((s, i) => (
          <a key={i} href={`#guide-${i}`}>
            {s.title}
          </a>
        ))}
      </nav>
      <div>
        {g.sections.map((s, i) => (
          <section id={`guide-${i}`} key={i}>
            <h3>{s.title}</h3>
            <RichText text={s.text} />
          </section>
        ))}
      </div>
    </section>
  );
}
