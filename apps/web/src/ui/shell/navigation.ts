import { Award, BookOpen, Bookmark, Bot, Boxes, Calculator, Component, Crosshair, Drama, Gem, GitCompareArrows, Home, LayoutGrid, PersonStanding, ScrollText, SlidersHorizontal, Sparkles, Sprout, Store, Target, type LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; children?: NavItem[] };
const child = (label: string, href: string, icon: LucideIcon): NavItem => ({ label, href, icon });
export const navigation: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Arsenal", href: "/arsenal", icon: Crosshair, children: [child("Warframes", "/arsenal/warframes", PersonStanding), child("Weapons", "/arsenal/weapons", Crosshair), child("Companions", "/arsenal/companions", Bot), child("Operator", "/arsenal/operator", Drama)] },
  { label: "Builds", href: "/builds", icon: Boxes, children: [child("My Builds", "/builds/my-builds", Bookmark), child("Loadouts", "/builds/loadouts", LayoutGrid), child("Compare", "/builds/compare", GitCompareArrows)] },
  { label: "Farm", href: "/farm", icon: Sprout, children: [child("Relics", "/farm/relics", Gem), child("Resources", "/farm/resources", Boxes), child("Prime Parts", "/farm/prime-parts", Component), child("Mastery", "/farm/mastery", Award)] },
  { label: "Market", href: "/market", icon: Store }, { label: "Codex", href: "/codex", icon: BookOpen },
  { label: "Tools", href: "/tools", icon: SlidersHorizontal, children: [child("Damage Calculator", "/tools/damage-calculator", Calculator), child("Enemy Simulator", "/tools/enemy-simulator", Target), child("Riven Analyzer", "/tools/riven-analyzer", ScrollText)] },
  { label: "Ask Cephalon", href: "/ask", icon: Sparkles },
];
export const flattenedNavigation = navigation.flatMap((item) => [item, ...(item.children ?? [])]);
