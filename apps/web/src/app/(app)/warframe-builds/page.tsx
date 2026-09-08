import { PageMasthead } from "@/ui/page-masthead";
import { guides } from "@/server/warframe-guides";
import { GuideDirectory } from "@/ui/warframe-builds";
import "@/ui/warframe-builds.css";
export const metadata = { title: "Warframe builds · Cephalon" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="wf-page">
      <PageMasthead eyebrow="ARSENAL / CURATED LOADOUTS" title="Warframe builds." description="Find your frame. Learn the setup. Make it yours." art="Mesa Prime" action={{href:"/arsenal",label:"Explore arsenal"}}/>
      <GuideDirectory
        initialQuery={q ?? ""}
        guides={guides.map((g) => ({
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
