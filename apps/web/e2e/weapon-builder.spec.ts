import { expect, test } from "@playwright/test";
test("builds Braton and reports confidence-tagged deltas", async ({ page }) => {
  await page.goto("/tools/weapon-builder");
  await page.getByRole("button", { name: /choose weapon/i }).click();
  await page.getByRole("button", { name: /braton/i }).first().click();
  const metric = page.locator("[data-metric=sustainedDps]");
  await expect(metric).not.toHaveText("—");
  const before = await metric.textContent();
  await page.getByRole("button", { name: /empty slot/i }).first().click();
  await page.getByRole("button", { name: /serration/i }).first().click();
  await expect(metric).not.toHaveText(before ?? "");
  await expect(page.locator("[data-delta]").first()).toBeVisible();
  await expect(page.locator("[data-confidence]").first()).toBeVisible();
});
