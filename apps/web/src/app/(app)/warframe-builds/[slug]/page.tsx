import Link from "next/link";
import { notFound } from "next/navigation";
import { guideDetails } from "@/server/warframe-guides";
import { ItemImage } from "@/ui/item-image";
import { WarframeEditor } from "@/ui/warframe-editor";
import { catalog } from "@/server/services";

import "@/ui/warframe-builds.css";
function RichText({ text }: { text: string }) {
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
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = guideDetails((await params).slug);
  if (!data) notFound();
  const { guide: g, frame, mods } = data;
  const shards = g.sections.find((s) => s.title === "Archon Shards");
  const colors = [
    "Amber",
    "Crimson",
    "Azure",
    "Emerald",
    "Topaz",
    "Violet",
  ].filter((c) => shards?.text.toLowerCase().includes(c.toLowerCase()));
  return (
    <div className="wf-page">
      <Link className="wf-back" href="/warframe-builds">
        ← Warframe builds
      </Link>
      <header className="wf-build-header">
        <div>
          <span className="wf-approved">✓ Cephalon approved guide</span>
          <p className="wf-kicker">{g.frame}</p>
          <h1>{g.title}</h1>
          <p>{g.subtitle}</p>
          <div className="wf-tags">
            <span>{g.meta.Role}</span>
            {g.meta.Content.split(/[,·]/).map((t) => (
              <span key={t}>{t.trim()}</span>
            ))}
          </div>
        </div>
        <ItemImage kind="warframe" name={g.frame} priority />
      </header>
      <WarframeEditor
        warframeId={frame!.id}
        mods={catalog.compatibleWarframeMods(frame!.id)}
        shards={catalog.getArchonShards()}
        initialShards={g.shardSlots}
        sourceStats={{
          stats: g.stats,
          pools: Object.fromEntries(
            Object.entries(g.pools).filter(
              (entry): entry is [string, number] =>
                typeof entry[1] === "number",
            ),
          ),
        }}
        shardText={shards?.text ?? ""}
        auraCount={g.auras.length}
        initialMods={[
          ...mods.map((m, i) => ({
            modId: m.card.id,
            rank: m.rank,
            slotIndex: i,
          })),
          ...[g.exilus, ...g.auras].flatMap((value, i) => {
            const mod = [...catalog.getModMap().values()].find(
              (m) => m.name === value.split(",")[0],
            );
            return mod
              ? [
                  {
                    modId: mod.id,
                    rank: mod.maxRank,
                    slotIndex: i === 0 ? 8 : 8 + i,
                  },
                ]
              : [];
          }),
        ]}
      />
      <section className="wf-equipped-arcanes">
        <h2>ARCANES</h2>
        {g.arcanes.map((a) => (
          <div key={a}>
            <ItemImage kind="arcane" name={a.replace(/\s*\(.*?\)/g, "")} />
            <span>{a}</span>
          </div>
        ))}
      </section>
      <section className="wf-abilities">
        <div className="wf-section-title">
          <h2>ABILITIES</h2>
          <span>{g.frame}</span>
        </div>
        {frame?.passive && (
          <p className="wf-passive">
            <strong>PASSIVE</strong> {frame.passive.replace(/<[^>]+>/g, "")}
          </p>
        )}
        <div>
          {frame?.abilities.map((a, i) => (
            <article key={a.name}>
              <span>{i + 1}</span>
              <h3>{a.name}</h3>
              <p>{a.description.replace(/<[^>]+>/g, "")}</p>
            </article>
          ))}
        </div>
        {!frame && (
          <p>
            Ability details are not available in the catalog for this frame.
          </p>
        )}
      </section>
      <section className="wf-guide">
        <header>
          <p className="wf-kicker">CEPHALON FIELD GUIDE</p>
          <h2>How to play this build.</h2>
          <blockquote>{g.summary}</blockquote>
        </header>
        <nav aria-label="Guide sections">
          {g.sections
            .filter((s) => s.title !== "Archon Shards")
            .map((s, i) => (
              <a key={i} href={`#guide-${i}`}>
                {s.title}
              </a>
            ))}
        </nav>
        <div>
          {g.sections
            .filter((s) => s.title !== "Archon Shards")
            .map((s, i) => (
              <section id={`guide-${i}`} key={i}>
                <h3>{s.title}</h3>
                <RichText text={s.text} />
              </section>
            ))}
        </div>
      </section>
    </div>
  );
}
