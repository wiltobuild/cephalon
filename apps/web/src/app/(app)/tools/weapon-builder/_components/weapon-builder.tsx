"use client";
import { useEffect, useMemo, useState } from "react";
import { Badge, Button, ConfidenceBadge, Dialog, Drawer, NumberInput, Panel, Stat, StatRow, TextInput } from "@/ui";
import type { BuildWeaponResponse, CompatibleMod, Scenario, WeaponDetail, WeaponListItem } from "@/server/contracts";
import styles from "./weapon-builder.module.css";

const scenarioDefault: Scenario = { headshots:false, statusTypesOnTarget:0, killStacks:0, arcaneStacks:0, level:100, enemyArchetypeId:"heavy_gunner", faction:"Grineer", steelPath:false };
const stat = (result:BuildWeaponResponse | null, key:string) => result?.stats.find((item) => item.key === key);
const format = (value?:number) => value === undefined ? "—" : new Intl.NumberFormat("en-US", { maximumFractionDigits:2 }).format(value);

function Delta({ before, after }:{ before?:number; after?:number }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (before === undefined || after === undefined || before === after) return; setShow(true); const timer = window.setTimeout(() => setShow(false), 2000); return () => window.clearTimeout(timer); }, [before, after]);
  if (!show || before === undefined || after === undefined || before === after) return null;
  const percent = before ? ((after - before) / before) * 100 : 0;
  return <span className={styles.delta} data-delta>{format(before)} → {format(after)} {percent >= 0 ? "+" : ""}{percent.toFixed(1)}%</span>;
}

export function WeaponBuilder() {
  const [weapons, setWeapons] = useState<WeaponListItem[]>([]);
  const [weaponId, setWeaponId] = useState<string | null>(null);
  const [detail, setDetail] = useState<WeaponDetail | null>(null);
  const [slots, setSlots] = useState<{modId:string;rank:number;slotIndex:number}[]>([]);
  const [result, setResult] = useState<BuildWeaponResponse | null>(null);
  const [previous, setPrevious] = useState<BuildWeaponResponse | null>(null);
  const [scenario, setScenario] = useState<Scenario>(scenarioDefault);
  const [picker, setPicker] = useState<"weapon"|number|null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const weapon = weapons.find((item) => item.id === weaponId);
  useEffect(() => { fetch("/api/weapons", { cache: "no-store" }).then((response) => response.json()).then(setWeapons).catch(() => setWeapons([])); }, []);
  useEffect(() => { if (!weaponId) return; fetch("/api/weapons/" + weaponId, { cache: "no-store" }).then((response) => response.json()).then((next) => { setDetail(next); setSlots([]); setResult(null); setPrevious(null); }).catch(() => setDetail(null)); }, [weaponId]);
  useEffect(() => {
    if (!weaponId || !detail) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/build/weapon", { method:"POST", headers:{"Content-Type":"application/json"}, signal:controller.signal, body:JSON.stringify({ weaponId, modSlots:slots, scenario }) });
        if (!response.ok) throw new Error((await response.json()).error);
        const next = await response.json() as BuildWeaponResponse;
        setPrevious(result); setResult(next); setError(null);
      } catch (caught) { if ((caught as Error).name !== "AbortError") setError((caught as Error).message); }
    }, 150);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [weaponId, detail, slots, scenario]);
  const listedWeapons = useMemo(() => weapons.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [weapons, query]);
  if (!weapon || !detail) return <div className={styles.empty}><Panel chamfer title="Weapon Builder"><p>Choose a weapon to begin.</p><Button onClick={() => setPicker("weapon")}>Choose weapon</Button></Panel><Picker open={picker === "weapon"} weapons={listedWeapons} query={query} setQuery={setQuery} select={(id) => { setWeaponId(id); setPicker(null); }} /></div>;
  const dps = stat(result, "sustainedDps"); const burst = stat(result, "burstDps"); const hit = stat(result, "totalDamage"); const ttk = result?.ttk;
  const ips = ["impact","puncture","slash"].map((key) => stat(result, key)).filter((item): item is NonNullable<typeof item> => item !== undefined);
  const elements = stat(result, "elementalDamage");
  const parts: { key:string; value:number }[] = result ? [...ips, ...(elements?.breakdown ?? []).map((item) => ({ ...item, key:item.type }))] : Object.entries(detail.base).filter(([key, value]) => ["impact","puncture","slash","heat","cold","toxin","electricity"].includes(key) && value).map(([key, value]) => ({ key, value }));
  const total = parts.reduce((sum, item) => sum + item.value, 0) || 1;
  const cc = stat(result, "criticalChance"); const cm = stat(result, "criticalMultiplier"); const sc = stat(result, "statusChance"); const fr = stat(result, "fireRate");
  return <div className={styles.builder}>
    <header className={styles.focus}><div><p className={styles.eyebrow}>Weapon configuration</p><h1>{weapon.name}</h1><div className={styles.chips}>{weapon.disposition !== undefined && <Badge>Disposition {weapon.disposition.toFixed(2)}</Badge>}{weapon.isIncarnon && <Badge variant="rare">Incarnon</Badge>}</div></div><Button variant="secondary" onClick={() => setPicker("weapon")}>Switch weapon</Button></header>
    <section className={styles.metrics}><StatRow>{[["Sustained DPS",dps,"sustainedDps"],["Burst DPS",burst,"burstDps"],["Average Hit",hit,"totalDamage"]].map(([label, item, key]) => <Stat key={key as string} label={label as string} value={<><span data-metric={key as string}>{format((item as typeof dps)?.value)}</span><Delta before={stat(previous, key as string)?.value} after={(item as typeof dps)?.value} /></>} confidence={(item as typeof dps)?.confidence} />)}<Stat label="Expected TTK" value={<><span>{format(ttk?.value)}</span><Delta before={previous?.ttk?.value} after={ttk?.value} /></>} confidence={ttk?.confidence} /></StatRow>{!ttk && result?.caveats.find((item) => item.startsWith("TTK unavailable:")) && <p className={styles.error}>{result.caveats.find((item) => item.startsWith("TTK unavailable:"))}</p>}{error && <p className={styles.error}>Calculation unavailable: {error}. Showing the last successful build.</p>}</section>
    <div className={styles.profiles}><Panel title="Damage profile" chamfer><div className={styles.damageStack}>{parts.map((item) => <span key={item.key} style={{width:(item.value / total * 100) + "%"}} />)}</div><div className={styles.legend}>{parts.map((item) => <span key={item.key}>{item.key} {format(item.value)}</span>)}</div><ConfidenceBadge tag={(hit ?? elements)?.confidence ?? "verified"} /></Panel><Panel title="Critical profile" chamfer><strong>{format((cc?.value ?? detail.base.criticalChance) * 100)}% CC · {format(cm?.value ?? detail.base.criticalMultiplier)}× CM</strong><p className="muted">Tier {((cc?.value ?? detail.base.criticalChance) * (cm?.value ?? detail.base.criticalMultiplier) >= 1) ? "reliable" : "base"}</p><ConfidenceBadge tag={cc?.confidence ?? "verified"} /></Panel><Panel title="Status output" chamfer><strong>{format((sc?.value ?? detail.base.statusChance) * (fr?.value ?? detail.base.fireRate))} / sec</strong><p className="muted">{format((sc?.value ?? detail.base.statusChance) * 100)}% status chance per shot.</p><ConfidenceBadge tag={sc?.confidence ?? "verified"} /></Panel></div>
    <Panel title="Mod configuration" chamfer><div className={styles.slots}>{Array.from({length:detail.modSlotCount}, (_, index) => { const equipped = slots.find((item) => item.slotIndex === index); const mod = detail.mods.find((item) => item.id === equipped?.modId); return <div key={index} className={styles.slot} role="button" tabIndex={0} onClick={() => setPicker(index)} onKeyDown={(event) => { if (event.key === "Enter") setPicker(index); }}>{mod ? <><b>{mod.name}</b><small>{mod.primaryEffect}</small><span className={styles.rank}><button onClick={(event) => { event.stopPropagation(); setSlots((old) => old.map((item) => item.slotIndex === index ? {...item,rank:Math.max(0,item.rank - 1)} : item)); }}>−</button>{equipped?.rank}/{mod.maxRank}<button onClick={(event) => { event.stopPropagation(); setSlots((old) => old.map((item) => item.slotIndex === index ? {...item,rank:Math.min(mod.maxRank,item.rank + 1)} : item)); }}>+</button></span></> : <><span className={styles.polarity}>◇</span><b>Empty slot</b><small>+</small></>}</div>; })}</div></Panel>
    <ScenarioPanel scenario={scenario} setScenario={setScenario} />
    <Panel title="Detailed calculations" chamfer><details><summary>Show calculation evidence</summary><div className={styles.details}>{result?.stats.map((item) => <div key={item.key}><span>{item.label}</span><strong>{format(item.value)}</strong><ConfidenceBadge tag={item.confidence} /></div>)}{result?.caveats.map((caveat) => <p key={caveat}>{caveat}</p>)}</div></details></Panel>
    <Picker open={picker === "weapon"} weapons={listedWeapons} query={query} setQuery={setQuery} select={(id) => { setWeaponId(id); setPicker(null); }} />
    <Drawer open={typeof picker === "number"} onOpenChange={(open) => setPicker(open ? picker : null)} title="Compatible mods"><TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mods" /><div className={styles.picker}>{detail.mods.filter((mod) => mod.name.toLowerCase().includes(query.toLowerCase())).map((mod) => <button key={mod.id} onClick={() => { const index = picker as number; setSlots((old) => [...old.filter((slot) => slot.slotIndex !== index), {modId:mod.id,rank:mod.maxRank,slotIndex:index}]); setPicker(null); }}><b>{mod.name}</b><span>{mod.primaryEffect}</span></button>)}</div></Drawer>
  </div>;
}

function Picker({ open, weapons, query, setQuery, select }:{open:boolean;weapons:WeaponListItem[];query:string;setQuery:(value:string)=>void;select:(id:string)=>void}) { return <Dialog open={open} onOpenChange={() => undefined} title="Select weapon"><TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search weapons" /><div className={styles.picker}>{weapons.map((item) => <button key={item.id} onClick={() => select(item.id)}><b>{item.name}</b><span>{item.category}{item.disposition !== undefined ? " · Disposition " + item.disposition.toFixed(2) : ""}</span></button>)}</div></Dialog>; }
function ScenarioPanel({ scenario, setScenario }:{scenario:Scenario;setScenario:(next:Scenario)=>void}) { const set = <K extends keyof Scenario>(key:K, value:Scenario[K]) => setScenario({...scenario,[key]:value}); return <Panel title="Scenario" chamfer><div className={styles.scenario}><label>Enemy<select value={scenario.enemyArchetypeId} onChange={(event) => set("enemyArchetypeId",event.target.value)}>{["lancer","elite_lancer","heavy_gunner","bombard","nox","demolisher","crewman","tech","moa","nullifier","charger","ancient_healer","toxic_ancient","corrupted_heavy","corrupted_bombard","eximus_gunner","acolyte"].map((id) => <option key={id}>{id}</option>)}</select></label><label>Level<NumberInput min={1} max={9999} value={scenario.level} onChange={(event) => set("level",Math.max(1,Math.min(9999,Number(event.target.value))))} /></label></div></Panel>; }
