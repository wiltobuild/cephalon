import Link from "next/link";
import { notFound } from "next/navigation";
import {
  equipmentGuides,
  categoryFor,
  categories,
} from "@/server/equipment-guides";
import { ItemImage } from "@/ui/item-image";
import { GuideLoadout, GuideSections } from "@/ui/guide-content";
import "@/ui/warframe-builds.css";
export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const g = equipmentGuides.find(
    (g) => g.slug === slug && categoryFor(g) === category,
  );
  if (!g) notFound();
  return (
    <div className="wf-page">
      <Link className="wf-back" href={`/equipment-builds/${category}`}>
        ← {categories[categoryFor(g)]}
      </Link>
      <header className="wf-build-header">
        <div>
          <span className="wf-approved">✓ Cephalon approved guide</span>
          <p className="wf-kicker">{g.frame}</p>
          <h1>{g.title}</h1>
          <p>{g.subtitle}</p>
          <div className="wf-tags">
            {Object.entries(g.meta)
              .filter(([k]) => k !== "")
              .map(([k, v]) => (
                <span key={k}>
                  {k}: {v}
                </span>
              ))}
          </div>
        </div>
        <ItemImage
          kind={category === "companions" ? "companion" : "weapon"}
          name={g.frame.replace(/ Incarnon$/, "").replace(/ \(.*?\)$/, "")}
          priority
        />
      </header>
      {g.statText && (
        <section className="guide-performance">
          <h2>BUILD PERFORMANCE</h2>
          <p>{g.statText}</p>
        </section>
      )}
      <GuideLoadout guide={g} />
      {g.arcanes.filter(Boolean).length > 0 && (
        <section className="wf-equipped-arcanes">
          <h2>ARCANES</h2>
          {g.arcanes.filter(Boolean).map((a, i) => (
            <div key={i}>
              <ItemImage kind="arcane" name={a.replace(/\s*\(.*?\)/g, "")} />
              <span>{a}</span>
            </div>
          ))}
        </section>
      )}
      <GuideSections guide={g} />
    </div>
  );
}
