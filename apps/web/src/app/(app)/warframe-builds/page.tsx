import { frameFamily } from "@/server/frame-family";
import { BuildLibraryNav } from "@/ui/build-library-nav";
import { auditedForma } from "@/server/guide-polarities";
import { PageMasthead } from "@/ui/page-masthead";
import { guides } from "@/server/warframe-guides";
import { GuideDirectory } from "@/ui/warframe-builds";
import "@/ui/warframe-builds.css";
export const metadata = { title: "Warframe builds · Cephalon" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; frame?: string }>;
}) {
  const { q, frame } = await searchParams;
  const selectedGuides = frame
    ? guides.filter((g) => frameFamily(g.frame) === frameFamily(frame))
    : guides;
  return (
    <div className="wf-page">
      <PageMasthead
        eyebrow="ARSENAL / CURATED LOADOUTS"
        title={frame ? `${frame} builds.` : "Warframe builds."}
        description="Find your frame. Learn the setup. Make it yours."
        art={frame?.replace(" and ", " & ") ?? "Mesa Prime"}
        action={frame ? {href:"/warframe-builds",label:"All Warframe builds"} : { href: "/arsenal", label: "Explore arsenal" }}
      />
      <BuildLibraryNav />
      <GuideDirectory
        key={frame ?? "all"}
        initialQuery={q ?? ""}
        guides={selectedGuides.map((g) => ({
          investment: g.meta.Investment ?? "",
          formaAudit: auditedForma(g),
          stats: g.stats,
          slug: g.slug,
          title: g.title,
          frame: g.frame,
          subtitle: g.subtitle,
          role: g.meta.Role,
          content: g.meta.Content,
        }))}
      />
    </div>
  );
}
