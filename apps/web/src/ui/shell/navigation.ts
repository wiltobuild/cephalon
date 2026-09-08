import {
  Home,
  Crosshair,
  Bookmark,
  Calculator,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
};
export const navigation: NavItem[] = [
  { label: "Overview", href: "/home", icon: Home },
  { label: "Arsenal", href: "/arsenal", icon: Crosshair },
  { label: "Weapon builder", href: "/tools/weapon-builder", icon: Calculator },
  { label: "Warframe builds", href: "/warframe-builds", icon: Crosshair },
  {
    label: "Weapon builds",
    href: "/equipment-builds/weapons",
    icon: Crosshair,
  },
  {
    label: "Archwing builds",
    href: "/equipment-builds/archwing",
    icon: Crosshair,
  },
  {
    label: "Companion builds",
    href: "/equipment-builds/companions",
    icon: Crosshair,
  },
  { label: "My builds", href: "/builds", icon: Bookmark },
  { label: "Mechanics & sources", href: "/codex", icon: BookOpen },
];
export const flattenedNavigation = navigation;
