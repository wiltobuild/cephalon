import { catalog } from "@/server/services";
export const runtime = "nodejs";
export function GET() { return Response.json(catalog.listWeapons(), { headers: { "Cache-Control": "public, max-age=3600, immutable" } }); }
