import { optimizer } from "@/server/services";
import { calculateResponse } from "@/server/calculate-response";
export const runtime = "nodejs";
export const maxDuration = 60;
let active = 0;
export async function POST(request: Request) {
  if (active >= 2)
    return Response.json(
      { error: "Two searches are running. Please try again shortly." },
      { status: 429 },
    );
  active++;
  try {
    const text = await request.text();
    if (text.length > 64000) throw new Error("Optimizer request is too large.");
    const { build, options } = JSON.parse(text);
    const result = await optimizer.optimize(build, options, request.signal);
    return Response.json({
      ...result,
      result: calculateResponse(result.build),
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Optimization failed.",
      },
      { status: 400 },
    );
  } finally {
    active--;
  }
}
