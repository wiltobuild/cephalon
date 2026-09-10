import Link from "next/link";
export function BuildLibraryNav({
  community = false,
}: {
  community?: boolean;
}) {
  return (
    <nav className="build-library-nav" aria-label="Build collections">
      <Link
        href="/curated-builds"
        aria-current={!community ? "page" : undefined}
      >
        Curated builds
      </Link>
      <Link
        href="/community-builds"
        aria-current={community ? "page" : undefined}
      >
        Community builds
      </Link>
      <Link href="/tier-list">Warframe tier list</Link>
    </nav>
  );
}
