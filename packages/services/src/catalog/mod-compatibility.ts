import metadata from "./mod-compatibility.json";
import type { Mod, Weapon } from "@cephalon/engine";
const labels: Record<string, string> = metadata.compatibility;
export function sourceModCategory(mod: Mod): string {
  if (mod.category === "augment" && mod.subCategory === "weapon")
    return "general";
  const label = labels[mod.id]?.trim().replace(/ mod$/, "");
  if (label?.includes("plexus") || label?.includes("railjack"))
    return "railjack";
  if (label === "primary") return "primary";
  if (label === "shotgun") return "shotgun";
  if (["rifle", "sniper", "assault rifle"].includes(label)) return "rifle";
  if (label === "bow") return "bow";
  if (["pistol", "secondary"].includes(label)) return "secondary";
  if (["arch-gun", "archgun"].includes(label)) return "archgun";
  if (
    [
      "melee",
      "archmelee",
      "warframe",
      "archwing",
      "necramech",
      "parazon",
      "aura",
      "companion",
      "sentinel",
      "robotic",
      "beast",
      "claws",
      "k-drive",
    ].includes(label)
  )
    return label;
  return mod.category;
}
export function sourceAllowsWeapon(mod: Mod, weapon: Weapon): boolean {
  const label = labels[mod.id]?.trim().replace(/ mod$/, "");
  if (
    /\|[A-Z_]+\||\{\{/.test(mod.description ?? "") ||
    /conclave|prove yourself|transmute core/i.test(
      `${mod.name} ${mod.description}`,
    ) ||
    mod.drain < 0
  )
    return false;
  if (
    mod.subCategory === "riven" &&
    /^riven_(rifle|shotgun|pistol|melee)$/.test(mod.id)
  )
    return true;
  if (!label) return false;
  if (label === "shotgun") return weapon.category === "shotgun";
  if (label === "rifle")
    return ["rifle", "bow", "launcher", "primary", "sentinel_weapon"].includes(
      weapon.category,
    );
  if (label === "sniper")
    return (
      weapon.name.toLowerCase().includes("sniper") ||
      /vectis|rubico|vulkar|lanka|snipetron|komorex|sporothrix|perigale/.test(
        weapon.name.toLowerCase(),
      )
    );
  if (label === "bow") return weapon.category === "bow";
  if (label === "primary")
    return ["rifle", "bow", "launcher", "primary", "shotgun"].includes(
      weapon.category,
    );
  if (["pistol", "secondary"].includes(label))
    return ["pistol", "secondary", "dual_pistols"].includes(weapon.category);
  if (["arch-gun", "archgun"].includes(label))
    return weapon.category === "archgun";
  if (label === "assault rifle") return weapon.category === "rifle";
  if (label?.includes("plexus") || label?.includes("railjack")) return false;
  if (label === "melee") return weapon.category === "melee";
  if (label === "tome") return /grimoire|noctua|tome/i.test(weapon.name);
  if (label === "rifle (no aoe)")
    return (
      weapon.category === "rifle" &&
      !/radial|explosion/i.test(JSON.stringify(weapon))
    );
  if (label === "pistol (no aoe)")
    return (
      ["pistol", "secondary"].includes(weapon.category) &&
      !/radial|explosion/i.test(JSON.stringify(weapon))
    );
  // Unknown labels (Focus, Warframe augments, crafting items, etc.) fail closed.
  const name = weapon.name.toLowerCase();
  return (
    name === label || name.endsWith(` ${label}`) || name.startsWith(`${label} `)
  );
}
