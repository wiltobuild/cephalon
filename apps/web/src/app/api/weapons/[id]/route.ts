import { catalog } from "@/server/services";
export const runtime = "nodejs";
export function GET(_: Request, { params }: { params: Promise<{ id: string }> }) { return params.then(({ id }) => { const detail = catalog.getWeaponDetail(id); return detail ? Response.json({ ...detail, mods: catalog.compatibleMods(id) }) : Response.json({ error: "Unknown weapon" }, { status: 404 }); }); }
