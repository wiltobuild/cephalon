import {test,expect} from "vitest";
import {CatalogService} from "@cephalon/services";
import guides from "./warframe-guides.json";
test("all 35 sample builds have catalog abilities, complete slots and chart stats",()=>{
 const catalog=new CatalogService();
 expect(guides).toHaveLength(35);
 expect(new Set(guides.map(g=>g.slug)).size).toBe(35);
 for(const guide of guides){
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
