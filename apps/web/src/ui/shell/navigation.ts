import {
  Orbit,
  Layers3,
  Bookmark,
  SlidersHorizontal,
  Swords,
  Feather,
  PawPrint,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  group: "Explore" | "Build library" | "Your loadouts";
  artwork?: { name: string; kind: string };
};
export const navigation: NavItem[] = [
  { label: "Overview", href: "/home", icon: Orbit, group: "Explore" },
  { label: "Arsenal", href: "/arsenal", icon: Layers3, group: "Explore" },
  {
    label: "Weapon builder",
    href: "/tools/weapon-builder",
    icon: SlidersHorizontal,
    group: "Explore",
  },
  {
    label: "Warframe builds",
    href: "/warframe-builds",
    icon: Sparkles,
    group: "Build library",
    artwork: { name: "Excalibur", kind: "warframe" },
  },
  {
    label: "Weapon builds",
    href: "/equipment-builds/weapons",
    icon: Swords,
    group: "Build library",
    artwork: { name: "Braton Prime", kind: "weapon" },
  },
  {
    label: "Archwing builds",
    href: "/equipment-builds/archwing",
    icon: Feather,
    group: "Build library",
    artwork: { name: "Odonata", kind: "archwing" },
  },
  {
    label: "Companion builds",
    href: "/equipment-builds/companions",
    icon: PawPrint,
    group: "Build library",
    artwork: { name: "Dethcube Prime", kind: "companion" },
  },
  {
    label: "My builds",
    href: "/builds",
    icon: Bookmark,
    group: "Your loadouts",
  },
];
export const flattenedNavigation = navigation;
