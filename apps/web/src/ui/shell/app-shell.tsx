"use client";
import { Command } from "cmdk";
import { Menu, Search, X, Hexagon, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { Dialog } from "@/ui";
import { ItemImage } from "@/ui/item-image";
import type { WeaponListItem } from "@/server/contracts";
import { navigation } from "./navigation";
import "./shell.css";
import "../site-polish.css";
export function AppShell({ children }: { children: ReactNode }) {
  const [mobile, setMobile] = useState(false),
    [palette, setPalette] = useState(false);
  const [weapons, setWeapons] = useState<WeaponListItem[]>([]),
    [query, setQuery] = useState("");
  const path = usePathname(),
    router = useRouter();
  useEffect(() => {
    setMobile(false);
  }, [path]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette((p) => !p);
      }
      if (event.key === "Escape") setMobile(false);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  useEffect(() => {
    if (palette && !weapons.length)
      fetch("/api/weapons")
        .then((r) => r.json())
        .then(setWeapons)
        .catch(() => {});
  }, [palette, weapons.length]);
  const isActive = (href: string) =>
    path === href ||
    path.startsWith(`${href}/`) ||
    (href === "/equipment-builds/weapons" &&
      /^\/equipment-builds\/(primary|secondary|melee)(\/|$)/.test(path));
  const go = (url: string) => {
    router.push(url);
    setPalette(false);
    setQuery("");
  };
  return (
    <div className="app-shell">
      {mobile && (
        <button
          className="nav-scrim"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        className={`sidebar ${mobile ? "sidebar--open" : ""}`}
        aria-label="Navigation"
      >
        <Link href="/home" className="brand">
          <Hexagon size={27} strokeWidth={1.4} />
          <span>
            CEPHALON<small>YOUR ARSENAL, UNDERSTOOD</small>
          </span>
        </Link>
        <div className="nav-heading">WORKSPACE</div>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "nav-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {active && <span className="nav-dot" />}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <span className="status-dot" /> ARSENAL WORKSPACE
          <p>Every build. Every tradeoff.</p>
          <Link href="/codex">
            Model coverage & sources <ArrowUpRight size={13} />
          </Link>
          <small>
            Unofficial Warframe companion.
            <br />
            Game assets © Digital Extremes.
          </small>
        </div>
      </aside>
      <div className="app-column">
        <header className="topbar">
          <div className="topbar-start">
            <button
              className="mobile-toggle"
              aria-label={mobile ? "Close navigation" : "Open navigation"}
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="topbar__context">
              WORKSPACE <span>/</span>{" "}
              {navigation.find((n) => isActive(n.href))?.label ?? "Arsenal"}
            </span>
          </div>
          <button
            aria-label="Search your arsenal"
            className="search-trigger"
            onClick={() => setPalette(true)}
          >
            <Search size={15} />
            <span>Search your arsenal</span>
            <kbd>⌘ K</kbd>
          </button>
        </header>
        <main className="main">{children}</main>
      </div>
      <Dialog
        open={palette}
        onOpenChange={setPalette}
        title="Find your next build"
      >
        <Command shouldFilter={false}>
          <Command.Input
            autoFocus
            className="palette__input"
            placeholder="Search weapons or pages…"
            value={query}
            onValueChange={setQuery}
          />
          <Command.List className="palette__list">
            <Command.Empty>No matches. Try another name.</Command.Empty>
            <Command.Group heading="Workspace">
              {navigation
                .filter((n) =>
                  n.label.toLowerCase().includes(query.toLowerCase()),
                )
                .map((n) => (
                  <Command.Item
                    className="palette__item"
                    key={n.href}
                    value={n.href}
                    onSelect={() => go(n.href)}
                  >
                    {n.label}
                    <ArrowUpRight size={14} />
                  </Command.Item>
                ))}
            </Command.Group>
            <Command.Group heading="Weapons">
              {weapons
                .filter((w) =>
                  w.name.toLowerCase().includes(query.toLowerCase()),
                )
                .slice(0, 15)
                .map((w) => (
                  <Command.Item
                    className="palette__item"
                    key={w.id}
                    value={w.id}
                    onSelect={() =>
                      go(
                        `/tools/weapon-builder?weapon=${encodeURIComponent(w.id)}`,
                      )
                    }
                  >
                    <ItemImage name={w.name} className="tiny-art" />
                    <span>{w.name}</span>
                    <small>{w.category}</small>
                  </Command.Item>
                ))}
            </Command.Group>
          </Command.List>
        </Command>
      </Dialog>
    </div>
  );
}
