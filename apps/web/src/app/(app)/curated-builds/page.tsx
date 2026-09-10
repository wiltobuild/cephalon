import Link from "next/link";
import { PageMasthead } from "@/ui/page-masthead";
import { BuildLibraryNav } from "@/ui/build-library-nav";
import { ItemImage } from "@/ui/item-image";
import { guides } from "@/server/warframe-guides";
import { categoryGuides } from "@/server/equipment-guides";
export default function Page() {
  const collections = [
    {
      name: "Warframes",
      href: "/warframe-builds",
      art: "Mesa Prime",
      kind: "warframe",
      count: guides.length,
    },
    {
      name: "Weapons",
      href: "/equipment-builds/weapons",
      art: "Phenmor",
      kind: "weapon",
      count: categoryGuides("weapons").length,
    },
    {
      name: "Companions",
      href: "/equipment-builds/companions",
      art: "Dethcube Prime",
      kind: "companion",
      count: categoryGuides("companions").length,
    },
    {
      name: "Archwing",
      href: "/equipment-builds/archwing",
      art: "Odonata",
      kind: "archwing",
      count: categoryGuides("archwing").length,
    },
  ];
  return (
    <div>
      <PageMasthead
        eyebrow="BUILD LIBRARY"
        title="Curated builds."
        description="Explore the guide collection by equipment type. Customize a setup to suit your arsenal."
        art="Mesa Prime"
      />
      <BuildLibraryNav />
      <p className="library-note">
        Curated is a collection label, not a verification badge. Guide figures
        remain unverified; calculated results carry their own confidence labels.
      </p>
      <div className="library-collections">
        {collections.map((c) => (
          <Link key={c.name} href={c.href}>
            <ItemImage name={c.art} kind={c.kind} />
            <h2>{c.name}</h2>
            <span>{c.count} guides →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
