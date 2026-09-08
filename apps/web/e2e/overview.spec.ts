import { test, expect } from "@playwright/test";

test("overview connects the complete library and newest Warframe", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-08T12:00:00-04:00") });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/home");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ready for",
  );
  await expect(page.locator(".ov-collection-strip strong")).toHaveText("394");
  await expect(page.locator(".ov-collection")).toHaveCount(4);
  for (const [name, href] of [
    ["Warframes", "/warframe-builds"],
    ["Weapons", "/equipment-builds/weapons"],
    ["Companions", "/equipment-builds/companions"],
    ["Archwing", "/equipment-builds/archwing"],
  ]) {
    await expect(
      page
        .getByRole("navigation", { name: "Build library shortcuts" })
        .getByRole("link", { name: new RegExp(name) }),
    ).toHaveAttribute("href", href);
  }
  for (const selector of [
    ".ov-hero-art",
    ".ov-featured img",
    ".ov-upcoming-art img",
  ]) {
    await expect
      .poll(() =>
        page
          .locator(selector)
          .evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
      )
      .toBe(true);
  }
  await expect(page.getByRole("timer")).toHaveAccessibleName(
    "15 days until release day",
  );
  await page
    .getByRole("link", { name: "Explore Sirius & Orion’s build" })
    .click();
  await expect(page).toHaveURL(/warframe-builds\/the-divided-star$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "The Divided Star",
  );
  expect(errors).toEqual([]);
});

test("coming soon removes itself at expiry and stays absent on later visits", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-09-22T23:59:00-04:00") });
  await page.clock.pauseAt(new Date("2026-09-22T23:59:58-04:00"));
  await page.goto("/home");
  await expect(page.locator("[data-upcoming-update]")).toBeVisible();
  await expect(page.getByRole("timer")).toHaveAccessibleName(
    "1 day until release day",
  );
  await page.clock.fastForward(3000);
  await expect(page.locator("[data-upcoming-update]")).toHaveCount(0);
  await expect(page.locator(".ov-featured")).toBeVisible();
  await page.reload();
  await expect(page.locator("[data-upcoming-update]")).toHaveCount(0);
  await expect(page.getByRole("timer")).toHaveCount(0);
});

test("overview works on phone and links into the library", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-09-08T12:00:00-04:00") });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/home");
  await expect(page.locator(".ov-upcoming")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("link", { name: "Explore the builds", exact: true })
    .click();
  await expect(page).toHaveURL(/#build-library$/);
  await page
    .locator(".ov-collection")
    .filter({ hasText: "Companions" })
    .click();
  await expect(page).toHaveURL(/equipment-builds\/companions$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Companion builds",
  );
});
