/** Replace this record and its artwork for each update. Provenance: public/art/updates/README.md. */
export const overviewCampaign = {
  current: {
    title: "Jade Shadows: Constellations",
    artwork: "/art/updates/constellations-hero.webp",
    source: "https://www.warframe.com/en/jade-shadows-constellations/sirius",
  },
  featured: {
    name: "Sirius & Orion",
    artwork: "/art/updates/sirius-and-orion.jpg",
    buildHref: "/warframe-builds/the-divided-star",
    description:
      "Two rivals. One Warframe. Master the celestial clash with a complete build and field guide.",
  },
  upcoming: {
    title: "Iceblade of Narin",
    artwork: "/art/updates/iceblade-of-narin-keyart.webp",
    source: "https://www.warframe.com/en/iceblade-of-narin",
    releaseLabel: "September 23, 2026",
    // DE announced a date, not an hour. Retire at the start of release day in Eastern time.
    releaseDayStartsAt: "2026-09-23T00:00:00-04:00",
  },
};
export function daysUntilRelease(now: number, release: string) {
  return Math.max(0, Math.ceil((Date.parse(release) - now) / 86_400_000));
}
