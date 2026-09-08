import {
  AssetService,
  BuildService,
  CatalogService,
  ConfidenceService,
  SimulationService,
  OptimizerService,
} from "@cephalon/services";

export const catalog = new CatalogService();
export const confidence = new ConfidenceService();
export const builds = new BuildService(catalog, confidence);
export const sims = new SimulationService(catalog, confidence);
export const assets = new AssetService(async (category) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/${category}.json`,
    { signal: AbortSignal.timeout(15000) },
  );
  if (!response.ok) throw new Error("Artwork source unavailable.");
  return response.json();
});
export const optimizer = new OptimizerService(catalog);
