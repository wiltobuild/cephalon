import { test, expect } from "@playwright/test";
import equipment from "../src/server/equipment-guides.json";
const categories: Record<string, string> = {
  "Primary weapons": "primary",
  "Secondary weapons": "secondary",
  "Melee weapons": "melee",
  "Archwing weapons": "archwing",
  Companions: "companions",
};
test("every equipment guide is addressable and retains its configuration", async ({
  request,
}) => {
  test.setTimeout(180000);
  for (const g of equipment) {
    const r = await request.get(
      `/equipment-builds/${categories[g.category]}/${g.slug}`,
    );
    expect(r.status(), g.title).toBe(200);
    const text = await r.text();
    expect(text).toContain("CONFIGURATION");
    expect(text).toContain("Cephalon approved guide");
  }
});
test("category search, guide navigation and mobile layout", async ({
  page,
}) => {
  await page.goto("/equipment-builds/weapons");
  await expect(page.getByText("178 builds", { exact: true })).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search equipment builds" })
    .fill("Torid");
  expect(await page.locator(".wf-guide-tile").count()).toBeGreaterThan(0);
  await page.locator(".wf-guide-tile").first().click();
  await expect(page.locator(".guide-mods article").first()).toBeVisible();
  await page.screenshot({
    path: "C:/Users/wilsh/Documents/Codex/2026-09-06/pu/outputs/cephalon-weapon-guides.png",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/equipment-builds/companions");
  await expect(page.getByText("20 builds", { exact: true })).toBeVisible();
  await page.locator(".wf-guide-tile").first().click();
  await expect(page.locator(".guide-mods article")).toHaveCount(10);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "C:/Users/wilsh/Documents/Codex/2026-09-06/pu/outputs/cephalon-companion-guide-mobile.png",
  });
});
test("renamed guide redirects and unknown categories return 404", async ({
  request,
}) => {
  const r = await request.get("/warframe-builds/venomous-bloom", {
    maxRedirects: 0,
  });
  expect(r.status()).toBe(308);
  expect(r.headers().location).toBe("/warframe-builds/the-spreading-rot");
  expect((await request.get("/equipment-builds/nope")).status()).toBe(404);
});
