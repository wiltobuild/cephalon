import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  categoryGuides,
  categoryFor,
  type Category,
} from "@/server/equipment-guides";
import { EquipmentDirectory } from "@/ui/equipment-directory";
import "@/ui/warframe-builds.css";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { category } = await params;
  if (!Object.hasOwn(categories, category)) notFound();
  const c = category as Category;
  return (
    <div className="wf-page">
      <header className="wf-directory-header">
        <div>
          <p className="wf-kicker">ARSENAL / CURATED LOADOUTS</p>
          <h1>{categories[c]}.</h1>
          <p>
            Proven setups, complete configurations and a field guide for every
            build.
          </p>
        </div>
      </header>
      <nav className="equipment-categories" aria-label="Build categories">
        <Link href="/warframe-builds">Warframes</Link>
        {Object.entries(categories).map(([key, label]) => (
          <Link
            key={key}
            aria-current={key === c ? "page" : undefined}
            href={`/equipment-builds/${key}`}
          >
            {
              (
                {
                  weapons: "All weapons",
                  primary: "Primary",
                  secondary: "Secondary",
                  melee: "Melee",
                  archwing: "Archwing",
                  companions: "Companions",
                } as Record<string, string>
              )[key]
            }
          </Link>
        ))}
      </nav>
      <EquipmentDirectory
        initialQuery={(await searchParams).q ?? ""}
        guides={categoryGuides(c).map((g) => ({
          slug: g.slug,
          title: g.title,
          frame: g.frame,
          subtitle: g.subtitle,
          content: g.meta.Content ?? "",
          role: g.meta.Role ?? "",
          category: categoryFor(g),
        }))}
      />
    </div>
  );
}
