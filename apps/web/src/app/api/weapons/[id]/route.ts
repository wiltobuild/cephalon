import { weaponModExclusions } from "@cephalon/services";
import { catalog } from "@/server/services";
export const runtime = "nodejs";
export function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return params.then(({ id }) => {
    const detail = catalog.getWeaponDetail(id);
    return detail
      ? Response.json({
          ...detail,
          exclusionGroups: weaponModExclusions(catalog),
          mods: catalog.compatibleMods(id),
          exilusMods: catalog.compatibleMods(id, "exilus"),
          arcanes: catalog.compatibleArcanes(id),
        })
      : Response.json({ error: "Unknown weapon" }, { status: 404 });
  });
}
