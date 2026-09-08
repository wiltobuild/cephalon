import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ItemImage } from "./item-image";

/** Shared compact counterpart to the cinematic overview hero. */
export function PageMasthead({
  eyebrow,
  title,
  description,
  art,
  kind = "warframe",
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  art: string;
  kind?: string;
  action?: { href: string; label: string };
}) {
  return (
    <header className="page-masthead">
      <div className="page-masthead-copy">
        <p className="page-masthead-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {action && (
          <Link href={action.href}>
            {action.label}
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <div className="page-masthead-art" aria-hidden="true">
        <ItemImage name={art} kind={kind} />
      </div>
      <span className="page-masthead-mark" aria-hidden="true">
        ✧
      </span>
    </header>
  );
}
