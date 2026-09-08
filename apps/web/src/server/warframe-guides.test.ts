import {test,expect} from "vitest";
import {CatalogService} from "@cephalon/services";
import guides from "./warframe-guides.json";
test("all 35 sample builds have catalog abilities, complete slots and chart stats",()=>{
 const catalog=new CatalogService();
 expect(guides).toHaveLength(193);
 expect(new Set(guides.map(g=>g.slug)).size).toBe(193);
 for(const guide of guides.slice(0,35)){
  expect(guide.mods,guide.title).toHaveLength(8);
  expect(Object.keys(guide.stats),guide.title).toHaveLength(4);
  const frame=[...catalog.getWarframesMap().values()].find(f=>f.name===guide.frame);
  expect(frame?.abilities.length,guide.frame).toBeGreaterThanOrEqual(4);
  expect(guide.sections.find(s=>s.title==='Archon Shards'),guide.title).toBeDefined();
 }
 expect(guides.find(g=>g.frame==='Jade')!.auras).toHaveLength(2);
 expect(guides.find(g=>g.frame==='Khora Prime')!.stats.Strength).toBe(40);
 expect(guides.find(g=>g.frame==='Mirage Prime')!.stats.Range).toBe(34);
});

import equipment from "./equipment-guides.json";
import aliases from "./guide-aliases.json";
test("all 394 authored guides retain configurations and unique routes",()=>{
 expect(guides.length+equipment.length).toBe(394);
 expect(equipment.filter(g=>g.category==="Primary weapons")).toHaveLength(61);
 expect(equipment.filter(g=>g.category==="Secondary weapons")).toHaveLength(45);
 expect(equipment.filter(g=>g.category==="Melee weapons")).toHaveLength(72);
 expect(equipment.filter(g=>g.category==="Archwing weapons")).toHaveLength(3);
 expect(equipment.filter(g=>g.category==="Companions")).toHaveLength(20);
 expect(new Set(equipment.map(g=>g.category+g.slug)).size).toBe(equipment.length);
 for(const g of [...guides,...equipment]) {expect(g.buildText,g.title).not.toBe("");expect(g.sections.length,g.title).toBeGreaterThan(0);expect(g.mods.length,g.title).toBeGreaterThanOrEqual(7);}
 for(const [old,target] of Object.entries(aliases)){expect(guides.some(g=>g.slug===old)).toBe(false);expect(guides.some(g=>g.slug===target),target).toBe(true);}
 expect(aliases["venomous-bloom"]).toBe("the-spreading-rot");
 expect(guides.find(g=>g.title==="The Divided Star")!.sections.some(s=>s.title.includes("Orion"))).toBe(true);
});
