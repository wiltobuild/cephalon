import { BookOpen, Boxes, Crosshair, Home, SlidersHorizontal, Sparkles, Sprout, Store, Swords, type LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; children?: NavItem[] };
const child = (label: string, href: string): NavItem => ({ label, href, icon: Swords });
export const navigation: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Arsenal", href: "/arsenal", icon: Crosshair, children: [child("Warframes", "/arsenal/warframes"), child("Weapons", "/arsenal/weapons"), child("Companions", "/arsenal/companions"), child("Operator", "/arsenal/operator")] },
  { label: "Builds", href: "/builds", icon: Boxes, children: [child("My Builds", "/builds/my-builds"), child("Loadouts", "/builds/loadouts"), child("Compare", "/builds/compare")] },
  { label: "Farm", href: "/farm", icon: Sprout, children: [child("Relics", "/farm/relics"), child("Resources", "/farm/resources"), child("Prime Parts", "/farm/prime-parts"), child("Mastery", "/farm/mastery")] },
  { label: "Market", href: "/market", icon: Store }, { label: "Codex", href: "/codex", icon: BookOpen },
  { label: "Tools", href: "/tools", icon: SlidersHorizontal, children: [child("Damage Calculator", "/tools/damage-calculator"), child("Enemy Simulator", "/tools/enemy-simulator"), child("Riven Analyzer", "/tools/riven-analyzer")] },
  { label: "Ask Cephalon", href: "/ask", icon: Sparkles },
];
export const flattenedNavigation = navigation.flatMap((item) => [item, ...(item.children ?? [])]);
