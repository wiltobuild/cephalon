"use client";
import { Command } from "cmdk";
import { Menu, Search, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, type ReactNode, useEffect, useState } from "react";
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
          <span className="brand-emblem" aria-hidden="true">
            <img src="/art/cephalon-logo.svg" width={52} height={52} alt="" />
          </span>
          <span>
            CEPHALON<small>YOUR ARSENAL, UNDERSTOOD</small>
          </span>
        </Link>
        <div className="nav-orbit" aria-hidden="true">
          <span>✧</span>
        </div>
        <nav aria-label="Primary navigation">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Fragment key={item.href}>
                {(index === 0 ||
                  navigation[index - 1].group !== item.group) && (
                  <div className="nav-heading">{item.group}</div>
                )}
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${active ? "nav-link--active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {item.artwork ? (
                      <ItemImage
                        name={item.artwork.name}
                        kind={item.artwork.kind}
                        className="nav-art"
                      />
                    ) : (
                      <Icon size={21} strokeWidth={1.4} />
                    )}
                  </span>
                  <span>{item.label}</span>
                  <span className="nav-chevron" aria-hidden="true">
                    ›
                  </span>
                </Link>
              </Fragment>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <span className="status-dot" /> ARSENAL WORKSPACE
          <p>Every build. Every tradeoff.</p>
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
