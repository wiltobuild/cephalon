import { PageMasthead } from "@/ui/page-masthead";
import { WarframeTierList } from "@/ui/warframe-tier-list";
import tiers from "@/server/warframe-tier-list.json";
import { catalog } from "@/server/services";
import { guides } from "@/server/warframe-guides";
import { frameFamily } from "@/server/frame-family";
import "@/ui/warframe-tier-list.css";
export const metadata = { title: "Warframe tier list · Cephalon" };
export default function Page() {
  const primeNames = new Map(
    [...catalog.getWarframesMap().values()]
      .filter((f) => f.name.endsWith(" Prime"))
      .map((f) => [frameFamily(f.name), f.name]),
  );
  const entries = tiers.map((t) => ({
    ...t,
    frames: t.frames.map((f) => ({
      ...f,
      name: primeNames.get(frameFamily(f.name)) ?? f.name,
      buildCount: guides.filter(
        (g) => frameFamily(g.frame) === frameFamily(f.name),
      ).length,
    })),
  }));
  return (
    <div className="tier-page">
      <PageMasthead
        eyebrow="FIELD GUIDE / WARFRAME RANKINGS"
        title="Find your next main."
        description="A general-purpose Warframe tier list. Explore the strengths, trade-offs, and builds behind every placement."
        art="Dante"
        action={{
          href: "/warframe-builds",
          label: "Explore all Warframe builds",
        }}
      />
      <div className="tier-context">
        <span>GENERAL-PURPOSE RANKING</span>
        <p>
          General-purpose editorial rankings, updated September 10, 2026.
          Mission specialists can outperform their placement in the right
          content. Prime variants are shown wherever available.
        </p>
      </div>
      <WarframeTierList tiers={entries} />
    </div>
  );
}
