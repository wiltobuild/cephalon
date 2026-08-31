import { BuildService, CatalogService, ConfidenceService, SimulationService } from "@cephalon/services";

export const catalog = new CatalogService();
export const confidence = new ConfidenceService();
export const builds = new BuildService(catalog, confidence);
export const sims = new SimulationService(catalog, confidence);
