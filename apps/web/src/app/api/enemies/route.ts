import { catalog } from "@/server/services";
export function GET() {
  return Response.json(
    catalog
      .getEnemyTypes()
      .map(({ id, name, faction }) => ({ id, name, faction })),
  );
}
