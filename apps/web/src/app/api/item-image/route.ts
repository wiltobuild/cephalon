import { assets } from "@/server/services";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  try {
    const url = await assets.resolve(
      params.get("kind") ?? "weapon",
      params.get("name") ?? "",
    );
    if (url)
      return new Response(null, {
        status: 307,
        headers: { Location: url, "Cache-Control": "public, max-age=86400" },
      });
  } catch {
    /* ItemImage provides a visible fallback. */
  }
  return new Response(null, {
    status: 404,
    headers: { "Cache-Control": "no-store" },
  });
}
