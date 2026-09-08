"use client";
import { useState } from "react";
import { Drawer } from "@/ui";
import { ItemImage } from "./item-image";
import type { CompatibleMod } from "@/server/contracts";
export function OwnedModPicker({
  mods,
  selected,
  onChange,
}: {
  mods: CompatibleMod[];
  selected?: string[];
  onChange: (ids: string[] | undefined) => void;
}) {
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState("");
  return (
    <div className="owned-controls">
      <label>
        <input
          type="checkbox"
          checked={selected !== undefined}
          onChange={(e) => {
            onChange(e.target.checked ? [] : undefined);
            if (e.target.checked) setOpen(true);
          }}
        />{" "}
        Use only selected mods
      </label>
      {selected !== undefined && (
        <button type="button" onClick={() => setOpen(true)}>
          Choose owned mods ({selected.length})
        </button>
      )}
      <Drawer open={open} onOpenChange={setOpen} title="Your available mods">
        <div className="owned-picker">
          <p>
            Select mods the solver may use. The search assumes you can rank
            these mods up; Endo and credit costs are not modeled.
          </p>
          <input
            aria-label="Search owned mods"
            placeholder="Find a mod…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="owned-list">
            {mods
              .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
              .slice(0, 80)
              .map((m) => (
                <label key={m.id}>
                  <input
                    type="checkbox"
                    checked={selected?.includes(m.id) ?? false}
                    onChange={(e) =>
                      onChange(
                        e.target.checked
                          ? [...(selected ?? []), m.id]
                          : (selected?.filter((id) => id !== m.id) ?? []),
                      )
                    }
                  />
                  <ItemImage name={m.name} kind="mod" className="tiny-art" />
                  <span>{m.name}</span>
                </label>
              ))}
          </div>
          <button type="button" onClick={() => setOpen(false)}>
            Use this selection
          </button>
        </div>
      </Drawer>
    </div>
  );
}
