import { expect, test } from "vitest";
import baseline from "./engine-baseline.json";
import { BASELINE_BUILDS, computeBaseline } from "./baseline-builds";

for (const build of BASELINE_BUILDS) {
  test(`golden baseline: ${build.id}`, () => {
    expect(computeBaseline(build)).toEqual(baseline[build.id as keyof typeof baseline]);
  });
}
