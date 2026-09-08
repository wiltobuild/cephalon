import { test, expect } from "@playwright/test";
import guides from "../src/server/warframe-guides.json";
test("all sample builds are addressable with abilities and an approved tag", async ({
  request,
}) => {
  for (const guide of guides) {
    const response = await request.get(`/warframe-builds/${guide.slug}`);
    expect(response.status(), guide.title).toBe(200);
    const html = await response.text();
    expect(html).toContain("Cephalon approved");
    expect(html).toContain("ABILITIES");
    expect(html).toContain("data-stat-polygon");
  }
});
test("Arsenal search opens a curated build with below-baseline stats", async ({
  page,
}) => {
  await page.goto("/arsenal");
  await page.getByRole("button", { name: "Warframes", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search arsenal" })
    .fill("Khora Prime");
  await page.getByRole("button", { name: /Khora Prime/ }).click();
  await page.getByRole("link", { name: "View Warframe builds" }).click();
  await expect(page.getByText("1 builds", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: /The Collector/ }).click();
  await expect(
    page.getByRole("heading", { name: "The Collector's Thunderdome" }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /Ability stat chart: Strength 40%/ }),
  ).toBeVisible();
  await expect(
    page.locator(".wf-mod-grid:not(.wf-aura-grid) article"),
  ).toHaveCount(8);
  await expect(page.locator(".wf-abilities article")).toHaveCount(4);
});
test("directory search and mobile layout stay usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/warframe-builds");
  await page
    .getByRole("textbox", { name: "Search Warframe builds" })
    .fill("Revenant");
  await page.getByRole("link", { name: /The Enthralled Sovereign/ }).click();
  await expect(page).toHaveURL(/warframe-builds\/the-enthralled-sovereign$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".wf-approved")).toContainText("Cephalon approved");
  await page.screenshot({
    path: "C:/Users/wilsh/Documents/Codex/2026-09-06/pu/outputs/cephalon-warframe-mobile.png",
  });
});

test("temporary customization updates mods, shards, radar and resets", async ({
  page,
}) => {
  await page.goto("/warframe-builds/the-enthralled-sovereign");
  await page
    .getByRole("button", { name: "Customize build", exact: true })
    .click();
  const strength = page.locator("[data-warframe-stat=Strength]");
  await expect(page.locator("[aria-busy=true]")).toHaveCount(0);
  const before = await strength.textContent();
  await page
    .getByRole("button", { name: "Remove Blind Rage", exact: true })
    .click();
  await expect(strength).not.toHaveText(before!);
  await page.getByRole("switch", { name: "Include shards in stats" }).check();
  await expect(page.locator("[aria-busy=true]")).toHaveCount(0);
  const withShards = await strength.textContent();
  await page.getByRole("button", { name: /Shard 2:/ }).click();
  await page
    .getByRole("combobox", { name: "Shard effect" })
    .selectOption("abilityDuration");
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(strength).not.toHaveText(withShards!);
  await expect(page.locator("main [role=alert]")).toHaveCount(0);
  await page.getByRole("button", { name: "Reset to approved build" }).click();
  await expect(strength).toHaveText("298%");
  await expect(
    page.getByRole("button", { name: "Customize build" }),
  ).toBeVisible();
});
test("flex shards choose legal effects and filters narrow the directory", async ({
  page,
}) => {
  await page.goto("/warframe-builds");
  await page.getByRole("button", { name: /Looting/ }).click();
  await expect(page.locator(".wf-guide-tile")).toHaveCount(3);
  await page.goto("/warframe-builds/infernal-symphony");
  await page.getByRole("button", { name: "Shard 3: Flexible" }).click();
  await page.getByRole("button", { name: "Crimson", exact: true }).click();
  await page
    .getByRole("combobox", { name: "Shard effect" })
    .selectOption("abilityStrength");
  await page.getByRole("checkbox", { name: "Tauforged shard" }).check();
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await page.getByRole("switch", { name: "Include shards in stats" }).check();
  await expect(page.locator("main [role=alert]")).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Shard 3: Tauforged Crimson Archon Shard",
    }),
  ).toBeVisible();
});
