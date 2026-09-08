import metadata from "./mod-compatibility.json";
import type { Mod, Weapon } from "@cephalon/engine";
const labels: Record<string, string> = metadata.compatibility;
export function sourceModCategory(mod: Mod): string {
  const label = labels[mod.id]?.replace(/ mod$/, "");
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
  const label = labels[mod.id]?.replace(/ mod$/, "");
  if (!label) return true; // Existing engine eligibility still applies.
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
  // Specific weapon tags and melee/utility classes retain engine profile checks.
  return true;
}
