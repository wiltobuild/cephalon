import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { computeAllBaselines } from "../test/golden/baseline-builds";

writeFileSync(resolve(import.meta.dirname, "../test/golden/engine-baseline.json"), `${JSON.stringify(computeAllBaselines(), null, 2)}\n`);
