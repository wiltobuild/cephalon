import { expect, test } from "@playwright/test";

test("weapon picker dismisses and mod search starts independently", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder");
  await page
    .getByRole("button", { name: "Choose weapon", exact: true })
    .click();
  await page.getByPlaceholder("Search weapons…").fill("Braton");
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Empty slot 1", exact: true }).click();
  await expect(page.getByPlaceholder("Search compatible mods…")).toHaveValue(
    "",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("mod editing recalculates, removes, and undoes", async ({ page }) => {
  await page.goto("/tools/weapon-builder");
  const metric = page.locator("[data-metric=sustainedDps]");
  await expect(metric).not.toHaveText("—");
  const before = await metric.textContent();
  await page.getByRole("button", { name: "Empty slot 1", exact: true }).click();
  await page.getByPlaceholder("Search compatible mods…").fill("Serration");
  await page
    .getByRole("region", { name: "Mod collection" })
    .getByRole("button")
    .filter({ has: page.getByText("Serration", { exact: true }) })
    .first()
    .click();
  await expect(metric).not.toHaveText(before!);
  await page
    .getByRole("button", { name: "Remove Serration", exact: true })
    .click();
  await expect(metric).toHaveText(before!);
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Remove Serration", exact: true }),
  ).toBeVisible();
});

test("no kill within the horizon displays as a limit, never zero", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder");
  await page
    .getByRole("combobox", { name: "Target faction", exact: true })
    .selectOption("Grineer");
  await expect(
    page.getByText("> 600 s", { exact: true }).first(),
  ).toBeVisible();
});

test("optimization produces an applicable build with source-category legality", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/tools/weapon-builder");
  await page
    .getByRole("button", { name: "Optimize build", exact: true })
    .click();
  await expect(page.getByText("BEST FOUND", { exact: true })).toBeVisible({
    timeout: 45000,
  });
  await expect(
    page.getByRole("heading", { name: "ONE BUILD. FOUR FACTIONS." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Remove Chilling Reload/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Remove Magnetic Strafe/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Remove Conductive Blade/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Remove Orgone Tuning Matrix",
      exact: true,
    }),
  ).toHaveCount(0);
  const hasCryo = await page
    .getByRole("button", { name: "Remove Cryo Rounds", exact: true })
    .count();
  const hasPrimedCryo = await page
    .getByRole("button", { name: "Remove Primed Cryo Rounds", exact: true })
    .count();
  expect(hasCryo + hasPrimedCryo).toBeLessThanOrEqual(1);
  await expect(page.locator("main [role=alert]")).toHaveCount(0);
});

test("save and reopen a versioned build snapshot", async ({ page }) => {
  await page.goto("/tools/weapon-builder?weapon=lex");
  await expect(
    page.getByRole("heading", { name: "Lex", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page
    .getByLabel("Build name", { exact: true })
    .fill("My Lex test build");
  await page.getByRole("button", { name: "Save build", exact: true }).click();
  await page
    .getByRole("link", { name: "My builds", exact: true })
    .first()
    .click();
  await page
    .getByRole("link")
    .filter({
      has: page.getByRole("heading", {
        name: "My Lex test build",
        exact: true,
      }),
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "Lex", exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/Shared build loaded/)).toBeVisible();
});

test("phone navigation and editing remain inside the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/tools/weapon-builder");
  await page
    .getByRole("button", { name: "Open navigation", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Arsenal", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Explore the arsenal." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open navigation", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/tools/weapon-builder");
  await expect(
    page.getByRole("button", { name: "Empty slot 1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "View build results", exact: true }),
  ).toBeInViewport();
  await page
    .getByRole("button", { name: "View build results", exact: true })
    .click();
  await expect(page.locator("#build-results")).toBeInViewport();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("undo restores the faction used by calculation and optimization", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder");
  const target = page.getByRole("combobox", {
    name: "Target faction",
    exact: true,
  });
  await target.selectOption("Corpus");
  await expect(target).toHaveValue("Corpus");
  await page.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(target).toHaveValue("general");
  await page.getByRole("button", { name: "Redo", exact: true }).click();
  await expect(target).toHaveValue("Corpus");
});

test("Exilus picker is restricted and equipped mod cards expose hover effects", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder");
  await page
    .getByRole("button", { name: "Empty Exilus slot", exact: true })
    .click();
  await page.getByPlaceholder("Search compatible mods…").fill("Serration");
  await expect(
    page.getByText("No compatible mods match that search."),
  ).toBeVisible();
  await page
    .getByPlaceholder("Search compatible mods…")
    .fill("Vigilante Supplies");
  await page
    .getByRole("region", { name: "Mod collection" })
    .getByRole("button")
    .filter({ has: page.locator(".game-mod-card") })
    .click();
  const mod = page.getByRole("button", {
    name: "Replace Vigilante Supplies in slot 9",
    exact: true,
  });
  await mod.hover();
  await expect(mod.getByRole("tooltip")).toBeVisible();
  await expect(mod.getByRole("tooltip")).toContainText(
    "Converts Secondary ammo",
  );
});

test("weapon arcanes update damage and reload and remain equipped after solving", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder");
  const dps = page.locator("[data-metric=sustainedDps]");
  await expect(dps).not.toHaveText("—");
  const before = await dps.textContent();
  const reload = await page.locator("[data-metric=reloadTime]").textContent();
  await page
    .getByRole("button", { name: "Choose weapon arcane", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: /Primary Merciless/ })
    .click();
  await expect(dps).not.toHaveText(before!);
  await expect(page.locator("[data-metric=reloadTime]")).not.toHaveText(
    reload!,
  );
  await page
    .getByRole("button", { name: "Optimize build", exact: true })
    .click();
  await expect(page.getByText("BEST FOUND", { exact: true })).toBeVisible({
    timeout: 45000,
  });
  await expect(
    page.getByRole("button", { name: "Choose weapon arcane", exact: true }),
  ).toContainText("Primary Merciless");
  await page.getByRole("switch", { name: "Conditional damage" }).uncheck();
  await expect
    .poll(async () => page.locator("[data-metric=sustainedDps]").textContent())
    .toBe(await page.locator("[data-metric=baseDps]").textContent());
  await page.getByRole("switch", { name: "Conditional damage" }).check();
  await expect(page.locator("[data-metric=sustainedDps]")).not.toHaveText(
    (await page.locator("[data-metric=baseDps]").textContent()) ?? "",
  );
  await expect(
    page.getByRole("button", { name: "Remove Heavy Caliber", exact: true }),
  ).toHaveCount(0);
});

test("combat is the default and Viral + Heat is enforced in the applied build", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/tools/weapon-builder");
  await expect(
    page.getByRole("combobox", { name: "Optimize for", exact: true }),
  ).toHaveValue("ttk");
  await page
    .getByRole("combobox", { name: "Damage preference", exact: true })
    .selectOption("viral_heat");
  await page
    .getByRole("button", { name: "Optimize build", exact: true })
    .click();
  await expect(page.getByText("BEST FOUND", { exact: true })).toBeVisible({
    timeout: 45000,
  });
  await expect(
    page.getByText(
      "Required damage types verified in the final build: viral + heat. Slot order and innate elements are included.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Peak status stacks" }),
  ).toBeVisible();
  await expect(page.locator("main [role=alert]")).toHaveCount(0);
});

test("a failed preference search can be adjusted and retried", async ({
  page,
}) => {
  let first = true;
  await page.route("**/api/optimize", async (route) => {
    if (first) {
      first = false;
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          error: "No feasible combination for these constraints.",
        }),
      });
    } else await route.continue();
  });
  await page.goto("/tools/weapon-builder");
  const optimize = page.getByRole("button", {
    name: "Optimize build",
    exact: true,
  });
  await optimize.click();
  await expect(
    page.getByText("No feasible combination for these constraints."),
  ).toBeVisible();
  await page
    .getByRole("combobox", { name: "Damage preference", exact: true })
    .selectOption("viral");
  await expect(optimize).toBeEnabled();
  await optimize.click();
  await expect(page.getByText("BEST FOUND", { exact: true })).toBeVisible({
    timeout: 45000,
  });
});

test("upgrade layout matches game slot positions", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/tools/weapon-builder");
  const slots = await Promise.all(
    Array.from({ length: 8 }, (_, i) =>
      page
        .getByRole("button", { name: `Empty slot ${i + 1}`, exact: true })
        .boundingBox(),
    ),
  );
  const stats = await page.locator("#build-results").boundingBox();
  const arcane = await page
    .getByRole("region", { name: "Weapon arcane" })
    .boundingBox();
  const exilus = await page
    .getByRole("button", { name: "Empty Exilus slot" })
    .boundingBox();
  const collection = await page
    .getByRole("region", { name: "Mod collection" })
    .boundingBox();
  expect(stats!.x + stats!.width).toBeLessThan(slots[0]!.x);
  expect(slots[0]!.y).toBe(slots[3]!.y);
  expect(slots[4]!.y).toBe(slots[7]!.y);
  expect(slots[4]!.y).toBeGreaterThan(slots[0]!.y);
  expect(slots[4]!.x).toBe(slots[0]!.x);
  expect(arcane!.x).toBeGreaterThan(slots[3]!.x);
  expect(exilus!.y).toBeGreaterThan(arcane!.y);
  expect(collection!.y).toBeGreaterThan(slots[7]!.y + slots[7]!.height);
});

test("readable mod controls and visible calculation units", async ({
  page,
}) => {
  await page.goto("/tools/weapon-builder");
  await page.getByRole("button", { name: "Empty slot 1", exact: true }).click();
  await page
    .getByPlaceholder("Search compatible mods…")
    .fill("Primed Cryo Rounds");
  await page
    .getByRole("region", { name: "Mod collection" })
    .getByRole("button")
    .filter({ has: page.locator(".is-primed") })
    .first()
    .click();
  const rank = page.getByRole("combobox", {
    name: "Rank for Primed Cryo Rounds",
  });
  await rank.selectOption("5");
  await expect(rank).toHaveValue("5");
  expect((await rank.boundingBox())!.width).toBeGreaterThanOrEqual(50);
  await expect(
    page
      .getByRole("button", { name: "Replace Primed Cryo Rounds in slot 1" })
      .locator(".game-mod-effect"),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Build details" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Build details" }).getByText(/%/),
  ).not.toHaveCount(0);
  await expect(page.locator("[data-metric=fireRate]")).toContainText("shots/s");
  await expect(page.locator("[data-metric=reloadTime]")).toContainText("s");
  await expect(page.getByText("Know the assumptions.")).toHaveCount(0);
  await expect(
    page.getByText("Deterministic search · no AI-generated math"),
  ).toHaveCount(0);
});
