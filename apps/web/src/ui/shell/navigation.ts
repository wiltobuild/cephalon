export type NavItem = { label: string; href: string; mark: string; children?: NavItem[] };
export const navigation: NavItem[] = [
  { label: "Home", href: "/home", mark: "⌂" },
  { label: "Arsenal", href: "/arsenal", mark: "◈", children: ["Warframes", "Weapons", "Companions", "Operator"].map((label) => ({ label, href: `/arsenal/${label.toLowerCase()}`, mark: "·" })) },
  { label: "Builds", href: "/builds", mark: "⌘", children: ["My Builds", "Loadouts", "Compare"].map((label) => ({ label, href: `/builds/${label.toLowerCase().replaceAll(" ", "-")}`, mark: "·" })) },
  { label: "Farm", href: "/farm", mark: "◇", children: ["Relics", "Resources", "Prime Parts", "Mastery"].map((label) => ({ label, href: `/farm/${label.toLowerCase().replaceAll(" ", "-")}`, mark: "·" })) },
  { label: "Market", href: "/market", mark: "¤" }, { label: "Codex", href: "/codex", mark: "▤" },
  { label: "Tools", href: "/tools", mark: "⚙", children: ["Damage Calculator", "Enemy Simulator", "Riven Analyzer"].map((label) => ({ label, href: `/tools/${label.toLowerCase().replaceAll(" ", "-")}`, mark: "·" })) },
  { label: "Ask Cephalon", href: "/ask", mark: "✦" },
];
export const flattenedNavigation = navigation.flatMap((item) => [item, ...(item.children ?? [])]);
