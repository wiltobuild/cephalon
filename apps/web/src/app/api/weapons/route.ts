import { catalog } from "@/server/services";
export const runtime = "nodejs";
export function GET() { return Response.json(catalog.listWeapons()); }
