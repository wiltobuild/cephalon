"use client";
import { useState, useEffect, useRef } from "react";
export const polarityNames = [
  "madurai",
  "vazarin",
  "naramon",
  "zenurik",
  "umbra",
  "unairu",
  "penjaga",
  "universal",
];
export function PolarityIcon({ value = "" }: { value?: string }) {
  const name = value.toLowerCase().replace(/ polarity$/, "");
  return polarityNames.includes(name) ? (
    <img
      className="polarity-icon"
      src={`/art/polarities/${name === "universal" ? "any" : name}.svg`}
      alt={`${name} polarity`}
      title={`${name} polarity`}
      width={24}
      height={24}
    />
  ) : (
    <span
      className="polarity-empty"
      title={value || "Unpolarized"}
      aria-label={value || "Unpolarized"}
    />
  );
}
export function PolarityPicker({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        root.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <div className="polarity-picker" ref={root}>
      <button
        type="button"
        disabled={!ready}
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <PolarityIcon value={value} />
        <span>{value || "None"}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="polarity-options" role="group" aria-label={label}>
          {["", ...polarityNames].map((v) => (
            <button
              key={v}
              type="button"
              aria-label={v || "None"}
              aria-pressed={v === value}
              onClick={() => {
                onChange(v);
                setOpen(false);
              }}
            >
              <PolarityIcon value={v} />
              <span>{v || "None"}</span>
            </button>
          ))}
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
