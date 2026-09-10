import Link from "next/link";
import { PageMasthead } from "@/ui/page-masthead";
import { BuildLibraryNav } from "@/ui/build-library-nav";
export default function Page() {
  return (
    <div>
      <PageMasthead
        eyebrow="BUILD LIBRARY"
        title="Community builds."
        description="A dedicated space for player-created loadouts."
        art="Excalibur"
      />
      <BuildLibraryNav />
      <section className="community-empty">
        <h2>The community collection starts here.</h2>
        <p>
          There are no published community builds yet. Publishing and
          submissions are coming soon.
        </p>
        <p>
          You can already experiment in the weapon builder and keep builds
          locally on your device.
        </p>
        <Link href="/tools/weapon-builder">Create a weapon loadout →</Link>
        <Link href="/curated-builds">Explore curated guides →</Link>
      </section>
    </div>
  );
}
