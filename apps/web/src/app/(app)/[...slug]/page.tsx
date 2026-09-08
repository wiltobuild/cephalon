import { notFound } from "next/navigation";
import { Overview, Arsenal, MyBuilds, Mechanics } from "@/ui/workspace-pages";
export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (slug[0] === "home") return <Overview />;
  if (slug[0] === "arsenal") return <Arsenal />;
  if (slug[0] === "builds") return <MyBuilds />;
  if (slug[0] === "codex") return <Mechanics />;
  return notFound();
}
