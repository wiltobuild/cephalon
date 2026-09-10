import { test, expect } from "@playwright/test";
test("weapon results show confidence and TTK before faction selection", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder?weapon=braton_prime");
  const ttk = page.getByRole("region", { name: "Expected time to kill" });
  await expect(ttk.locator('[data-confidence="approximation"]')).toBeVisible();
  await expect(ttk.locator("strong")).toContainText(/s/);
  await expect(
    page.locator('[data-metric="sustainedDps"] + [data-confidence="verified"]'),
  ).toBeVisible();
  await expect(
    page
      .getByRole("region", { name: "Calculation confidence" })
      .locator('[data-confidence="not-modeled"]')
      .first(),
  ).toBeVisible();
  await page.getByLabel("TTK target").selectOption("Corpus");
  await expect(page.getByLabel("Target faction")).toHaveValue("Corpus");
  await expect(ttk.locator("strong")).not.toHaveText("…");
  const response = await page.request.get("/api/weapons/braton_prime");
  const data = await response.json();
  expect(
    data.mods.some(
      (m: { id: string }) =>
        m.id === "wellspring" || m.id === "rifle_riven_mod",
    ),
  ).toBe(false);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("curated and community collections are separate, without approval claims", async ({
  page,
}) => {
  await page.goto("/curated-builds");
  await expect(
    page.getByRole("heading", { name: "Curated builds." }),
  ).toBeVisible();
  await expect(page.locator(".library-collections a")).toHaveCount(4);
  await expect(page.locator(".brand img")).toHaveAttribute(
    "src",
    "/art/cephalon-logo.svg",
  );
  await page.goto("/community-builds");
  await expect(
    page.getByText("There are no published community builds yet.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.goto("/warframe-builds/the-enthralled-sovereign");
  await expect(
    page.locator('.wf-stats [data-confidence="pending-verification"]').first(),
  ).toBeVisible();
  expect(await page.locator("main").innerText()).not.toMatch(
    /Cephalon approved|\bauthor(?:[’']s)?\b/i,
  );
  await page
    .getByRole("button", { name: "Customize build", exact: true })
    .click();
  await expect(
    page.locator('.wf-stats [data-confidence="approximation"]').first(),
  ).toBeVisible();
  await expect(
    page.locator('.wf-pools [data-confidence="verified"]').first(),
  ).toBeVisible();
});
