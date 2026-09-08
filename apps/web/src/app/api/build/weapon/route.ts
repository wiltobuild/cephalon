import type { BuildWeaponRequest } from "@/server/contracts";
import { calculateResponse } from "@/server/calculate-response";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length") ?? 0) > 32000)
      throw new Error("Build request is too large.");
    const text = await request.text();
    if (text.length > 32000) throw new Error("Build request is too large.");
    return Response.json(
      calculateResponse(JSON.parse(text) as BuildWeaponRequest),
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Invalid build." },
      { status: 400 },
    );
  }
}
