import { test, expect } from "@playwright/test";
import guides from "../src/server/warframe-guides.json";
test("Tauforged shards load complete crystal artwork", async ({ page }) => {
  await page.goto("/warframe-builds/the-enthralled-sovereign");
  const shards = page.locator(".wf-shard-tray .is-tauforged img");
  await expect(shards).toHaveCount(5);
  await expect(page.locator(".tauforged-base,.tauforged-glow")).toHaveCount(0);
  await expect
    .poll(() =>
      shards
        .first()
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
    )
    .toBe(true);
  const response = await page.request.get(
    "/api/item-image?kind=shard&name=Tauforged%20Amber%20Archon%20Shard&v=2",
  );
  expect(response.url()).toContain("/art/shards/TauforgedAmberArchonShard.png");
  await expect(
    page.locator(".wf-ability-heading .wf-ability-icon").first(),
  ).toHaveCSS("height", "36px");
});

test("polarity picker uses game symbols and changes slot polarity", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder?weapon=braton");
  const picker = page.getByRole("button", {
    name: "Polarity for slot 1",
    exact: true,
  });
  await picker.click();
  await page.getByRole("button", { name: "madurai", exact: true }).click();
  await expect(picker.locator("img")).toHaveAttribute(
    "src",
    "/art/polarities/madurai.svg",
  );
});
test("Sirius and Orion have independent editable loadouts", async ({
  page,
}) => {
  await page.goto("/warframe-builds/the-divided-star");
  await page.getByRole("tab", { name: "Orion", exact: true }).click();
  const panel = page.getByRole("tabpanel");
  await expect(
    panel.locator(".game-mod-title", { hasText: "Overextended" }),
  ).toBeVisible();
  await expect(panel.locator('[data-warframe-stat="Range"]')).toHaveText(
    "265%",
  );
  await panel
    .getByRole("button", { name: "Customize build", exact: true })
    .click();
  await panel
    .getByRole("button", { name: "Remove Overextended", exact: true })
    .click();
  await expect(panel.locator('[data-warframe-stat="Range"]')).toHaveText(
    "175%",
  );
  await page.getByRole("tab", { name: "Sirius", exact: true }).click();
  await expect(
    page
      .getByRole("tabpanel")
      .locator(".game-mod-title", { hasText: "Equilibrium" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Orion", exact: true }).click();
  await expect(
    page.getByRole("tabpanel").locator('[data-warframe-stat="Range"]'),
  ).toHaveText("175%");
});
test("exalted builds open inside the Warframe page", async ({ page }) => {
  const mesa = guides.find((g) => g.frame === "Mesa Prime")!;
  await page.goto(`/warframe-builds/${mesa.slug}`);
  await page.getByRole("tab", { name: /Regulators Prime/ }).click();
  await expect(
    page.getByRole("tabpanel").locator(".guide-mods article"),
  ).toHaveCount(8);
  await expect(page).toHaveURL(new RegExp(mesa.slug));
});
test("mobile cards have Forma and a chart without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/warframe-builds?q=Khora");
  const card = page.locator(".wf-guide-tile").first();
  await expect(card.locator(".forma-cost")).toContainText("3 Forma");
  await expect(
    card.getByRole("img", { name: /Ability stat chart/ }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("Warframe slot highlights follow guide slots rather than mod polarity", async ({
  page,
}) => {
  await page.goto("/warframe-builds/the-caged-beast");
  await expect(
    page.locator(".wf-edit-layout article[data-slot-polarized=true]"),
  ).toHaveCount(5);
  await expect(
    page.locator(".wf-edit-layout article").filter({
      has: page.getByRole("button", {
        name: "Change Warframe slot 1",
        exact: true,
      }),
    }),
  ).toHaveAttribute("data-slot-polarized", "false");
});

test("aura capacity follows rank and matching, neutral, and mismatched polarities", async ({
  page,
}) => {
  await page.goto("/warframe-builds/the-enthralled-sovereign");
  const total = page.locator("[data-capacity-total]");
  await expect(total).toHaveText("73 / 74");
  await expect(
    page.locator(".wf-aura-grid .game-mod-capacity b").first(),
  ).toHaveText("+14");
  await expect(
    page.getByText("Author’s full configuration and arsenal figures", {
      exact: true,
    }),
  ).toHaveCount(0);
  await expect(page.locator(".wf-ability-icon img")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Customize build", exact: true })
    .click();
  const picker = page.getByRole("button", {
    name: "Polarity for Warframe slot 10",
    exact: true,
  });
  await picker.click();
  await page.getByRole("button", { name: "None", exact: true }).click();
  await expect(total).toHaveText("73 / 67");
  await expect(page.locator(".wf-capacity")).toHaveAttribute(
    "data-over-capacity",
    "true",
  );
  await picker.click();
  await page.getByRole("button", { name: "madurai", exact: true }).click();
  await expect(total).toHaveText("73 / 65");
  await picker.click();
  await page.getByRole("button", { name: "naramon", exact: true }).click();
  await page
    .getByLabel("Rank for Corrosive Projection", { exact: true })
    .selectOption("0");
  await expect(total).toHaveText("73 / 64");
  await page
    .getByRole("button", { name: "Remove Corrosive Projection", exact: true })
    .click();
  await expect(total).toHaveText("73 / 60");
  await page
    .getByRole("button", { name: "Reset to curated build", exact: true })
    .click();
  await expect(total).toHaveText("73 / 74");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
