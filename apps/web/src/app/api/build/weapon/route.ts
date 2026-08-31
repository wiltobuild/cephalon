import type { BuildWeaponRequest, BuildWeaponResponse } from "@/server/contracts";
import { builds, catalog, sims } from "@/server/services";
export const runtime = "nodejs";
function valid(value: unknown): value is BuildWeaponRequest { const body = value as Partial<BuildWeaponRequest>; return !!body && typeof body.weaponId === "string" && Array.isArray(body.modSlots) && !!body.scenario && typeof body.scenario.headshots === "boolean" && typeof body.scenario.statusTypesOnTarget === "number" && typeof body.scenario.killStacks === "number" && typeof body.scenario.arcaneStacks === "number"; }
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!valid(body)) return Response.json({ error: "Invalid weapon build request" }, { status: 400 });
  if (!catalog.getWeapon(body.weaponId)) return Response.json({ error: `Unknown weapon: ${body.weaponId}` }, { status: 404 });

  const level = body.scenario.level ?? 1;
  if (!Number.isFinite(level) || level < 1 || level > 9999) {
    return Response.json({ error: "Scenario level must be between 1 and 9999" }, { status: 400 });
  }
  if (body.scenario.enemyArchetypeId && !catalog.getEnemyTypes().some((enemy) => enemy.id === body.scenario.enemyArchetypeId)) {
    return Response.json({ error: `Unknown enemy archetype: ${body.scenario.enemyArchetypeId}` }, { status: 400 });
  }

  try {
    const result = builds.calculateWeapon({ ...body, scenario: { ...body.scenario, level } });
    const response: BuildWeaponResponse = result;
    if (body.scenario.enemyArchetypeId) {
      try {
        const simulation = sims.simulate(result, { enemyArchetypeId: body.scenario.enemyArchetypeId, level, steelPath: body.scenario.steelPath });
        response.ttk = { value: simulation.ttk.ttk, confidence: simulation.caveats.find((item) => item.key === "steelPath")?.tag ?? "approximation", caveats: simulation.caveats };
      } catch (error) {
        response.caveats = [...response.caveats, `TTK unavailable: ${error instanceof Error ? error.message : "simulation failed"}`];
      }
    }
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Calculation failed" }, { status: 400 });
  }
}
