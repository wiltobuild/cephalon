import Link from "next/link";
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
      <header className="wf-directory-header">
        <div>
          <p className="wf-kicker">ARSENAL / CURATED LOADOUTS</p>
          <h1>Warframe builds.</h1>
          <p>Find your frame. Learn the setup. Make it yours.</p>
        </div>
        <Link href="/arsenal">Explore arsenal →</Link>
      </header>
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
