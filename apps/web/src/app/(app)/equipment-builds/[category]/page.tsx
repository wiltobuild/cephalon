import { PageMasthead } from "@/ui/page-masthead";
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
      <PageMasthead
        eyebrow="ARSENAL / CURATED LOADOUTS"
        title={`${categories[c]}.`}
        description="Complete configurations and field guides for your next mission."
        art={
          {
            weapons: "Phenmor",
            primary: "Phenmor",
            secondary: "Lex Prime",
            melee: "Hate",
            archwing: "Mausolon",
            companions: "Dethcube Prime",
          }[c]
        }
        kind={c === "companions" ? "companion" : "weapon"}
        action={{ href: "/arsenal", label: "Explore arsenal" }}
      />
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
          investment: g.meta.Investment ?? "",
          stats: g.stats,
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
