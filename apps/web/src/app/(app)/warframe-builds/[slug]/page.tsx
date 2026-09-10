import { auditedForma, guidePolarities } from "@/server/guide-polarities";
import type { Guide } from "@/server/guide-types";
import { equipmentGuides } from "@/server/equipment-guides";
import { BuildTabs } from "@/ui/build-tabs";
import { FormaCost } from "@/ui/forma-cost";
import { linkedExaltedGuides, orionGuide } from "@/server/linked-guides";
import { calculateWarframeDraft } from "@/server/warframe-draft";
import aliases from "@/server/guide-aliases.json";
import { GuideLoadout, GuideSections } from "@/ui/guide-content";
import { StatRadar } from "@/ui/warframe-builds";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
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
function WarframeGuideView({
  guide,
  form,
}: {
  guide: Guide;
  form?: "sirius" | "orion";
}) {
  const data = guideDetails(guide.slug, guide)!;
  const { guide: g, frame, mods } = data;
  const shards = g.sections.find((s) => s.title === "Archon Shards");
  const initialMods = [
    ...mods.map((m, i) => ({ modId: m.card.id, rank: m.rank, slotIndex: i })),
    ...[g.exilus, ...g.auras].flatMap((value, i) => {
      const mod = [...catalog.getModMap().values()].find(
        (m) => m.name === value.split(",")[0],
      );
      return mod
        ? [{ modId: mod.id, rank: mod.maxRank, slotIndex: 8 + i }]
        : [];
    }),
  ];
  let editable = false;
  if (
    frame &&
    [g.exilus, ...g.auras]
      .filter(Boolean)
      .every((value) =>
        [...catalog.getModMap().values()].some(
          (m) => m.name === value.split(",")[0],
        ),
      )
  ) {
    try {
      calculateWarframeDraft({
        warframeId: frame.id,
        form,
        mods: initialMods,
        shards: g.shardSlots,
        includeShards: true,
      });
      editable = true;
    } catch {
      /* Preserve the authored configuration when it cannot be modeled. */
    }
  }
  return (
    <div className="wf-page">
      <header className="wf-build-header">
        <div>
          <span className="wf-approved">✓ Cephalon approved guide</span>
          <p className="wf-kicker">{g.frame}</p>
          <h1>
            {g.title}
            {form ? ` · ${form === "sirius" ? "Sirius" : "Orion"}` : ""}
          </h1>
          <FormaCost investment={g.meta.Investment} audit={auditedForma(g)} />
          <p>{g.subtitle}</p>
          <div className="wf-tags">
            <span>{g.meta.Role}</span>
            {g.meta.Content.split(/[,·]/).map((t) => (
              <span key={t}>{t.trim()}</span>
            ))}
          </div>
        </div>
        <ItemImage
          kind="warframe"
          name={
            form === "orion"
              ? "Orion & Sirius"
              : g.frame.replace("Sirius and Orion", "Sirius & Orion")
          }
          priority
        />
      </header>
      {editable && frame ? (
        <WarframeEditor
          form={form}
          warframeId={frame!.id}
          mods={catalog.compatibleWarframeMods(frame!.id)}
          shards={catalog.getArchonShards()}
          initialShards={g.shardSlots}
          sourceStats={
            form === "orion"
              ? calculateWarframeDraft({
                  warframeId: frame.id,
                  form,
                  mods: initialMods,
                  shards: g.shardSlots,
                  includeShards: false,
                })
              : {
                  stats: g.stats,
                  pools: Object.fromEntries(
                    Object.entries(g.pools).filter(
                      (entry): entry is [string, number] =>
                        typeof entry[1] === "number",
                    ),
                  ),
                }
          }
          shardText={shards?.text ?? ""}
          auraCount={g.auras.length}
          arcanes={g.arcanes}
          initialMods={initialMods}
          initialPolarities={guidePolarities(g)}
        />
      ) : (
        <>
          <section className="guide-performance">
            <h2>BUILD PERFORMANCE</h2>
            <p>{g.statText}</p>
            <StatRadar stats={g.stats} />
          </section>
          <GuideLoadout guide={g} />
        </>
      )}

      {!editable && (
        <section className="wf-equipped-arcanes">
          <h2>ARCANES</h2>
          {g.arcanes.map((a) => (
            <div key={a}>
              <ItemImage kind="arcane" name={a.replace(/\s*\(.*?\)/g, "")} />
              <span>{a}</span>
            </div>
          ))}
        </section>
      )}
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
          {frame?.abilities
            .filter(
              (_, i) =>
                !form ||
                (form === "sirius" ? [0, 2, 4, 6] : [1, 3, 5, 6]).includes(i),
            )
            .map((a, i) => (
              <article key={a.name}>
                <header className="wf-ability-heading">
                  <span
                    className="wf-ability-number"
                    aria-label={`Ability ${i + 1}`}
                  >
                    {i + 1}
                  </span>
                  <h3>{a.name}</h3>
                  <ItemImage
                    kind="ability"
                    name={a.name}
                    className="wf-ability-icon"
                  />
                </header>
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
              <a key={i} href={`#${form ?? g.slug}-guide-${i}`}>
                {s.title}
              </a>
            ))}
        </nav>
        <div>
          {g.sections
            .filter((s) => s.title !== "Archon Shards")
            .map((s, i) => (
              <section id={`${form ?? g.slug}-guide-${i}`} key={i}>
                <h3>{s.title}</h3>
                <RichText text={s.text} />
              </section>
            ))}
        </div>
      </section>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const alias = (aliases as Record<string, string>)[slug];
  if (alias) permanentRedirect(`/warframe-builds/${alias}`);
  const data = guideDetails(slug);
  if (!data) notFound();
  const g = data.guide;
  const dual = g.frame.includes("Sirius");
  const tabs = [
    {
      label: dual ? "Sirius" : g.frame,
      content: (
        <WarframeGuideView guide={g} form={dual ? "sirius" : undefined} />
      ),
    },
    ...(dual
      ? [
          {
            label: "Orion",
            content: <WarframeGuideView guide={orionGuide(g)} form="orion" />,
          },
        ]
      : []),
    ...linkedExaltedGuides(g, equipmentGuides).map((e) => ({
      label: `${e.frame} · ${e.title}`,
      content: (
        <div className="wf-page">
          <header className="wf-build-header">
            <div>
              <span className="wf-approved">✓ Cephalon approved</span>
              <p className="wf-kicker">{e.frame}</p>
              <h1>{e.title}</h1>
              <FormaCost investment={e.meta.Investment} />
              <p>{e.subtitle}</p>
            </div>
            <ItemImage name={e.frame} />
          </header>
          <section className="guide-performance">
            <h2>BUILD PERFORMANCE</h2>
            <p>{e.statText}</p>
          </section>
          <GuideLoadout guide={e} />
          <section className="wf-equipped-arcanes">
            <h2>ARCANES</h2>
            {e.arcanes.filter(Boolean).map((a) => (
              <div key={a}>
                <ItemImage kind="arcane" name={a.replace(/\s*\(.*?\)/g, "")} />
                <span>{a}</span>
              </div>
            ))}
          </section>
          <GuideSections guide={e} />
        </div>
      ),
    })),
  ];
  return (
    <div className="linked-build-page">
      <Link className="wf-back" href="/warframe-builds">
        ← Warframe builds
      </Link>
      {tabs.length > 1 ? <BuildTabs tabs={tabs} /> : tabs[0].content}
    </div>
  );
}
