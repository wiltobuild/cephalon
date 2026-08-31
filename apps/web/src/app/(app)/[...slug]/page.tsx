import { Panel } from "@/ui";
import { flattenedNavigation } from "@/ui/shell/navigation";
export default async function Placeholder({ params }: { params: Promise<{ slug: string[] }> }) { const { slug } = await params; const path = `/${slug.join("/")}`; const name = flattenedNavigation.find((item) => item.href === path)?.label ?? slug.map((part) => part.replaceAll("-", " ")).join(" / "); return <div className="page"><h1 className="page-title">{name}</h1><Panel title={name} chamfer><div className="placeholder">{name} — coming in a later task</div></Panel></div>; }
