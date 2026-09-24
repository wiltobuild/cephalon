import { test, expect } from "@playwright/test";
test("curated Torid supports filtered quick editing with live capacity and a collapsed tray", async ({
  page,
}) => {
  await page.goto("/equipment-builds/primary/the-chaining-rot");
  await expect(page.locator('[data-metric="sustainedDps"]')).toContainText(
    /\d/,
  );
  await expect(page.locator("main").getByRole("alert")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Optimize build" }),
  ).toHaveCount(0);
  const results = page.locator("#build-results");
  expect(
    await results.evaluate((el) => el.scrollHeight <= el.clientHeight + 1),
  ).toBe(true);
  const tray = page.getByRole("region", { name: "Mod collection" });
  await expect(tray.getByRole("button")).toHaveCount(1);
  expect(
    await tray.evaluate((el) => el.getBoundingClientRect().height),
  ).toBeLessThan(90);
  await page.getByRole("button", { name: "Expand tray" }).click();
  await expect(
    tray.getByRole("button", { name: /Galvanized Chamber/ }),
  ).toHaveCount(0);
  await page
    .getByRole("button", {
      name: "Replace High Voltage in slot 2",
      exact: true,
    })
    .click();
  const picker = page.getByRole("dialog", { name: "Choose mod for slot 2" });
  await picker.getByRole("textbox").fill("Malignant Force");
  await picker.getByRole("button", { name: /Malignant Force/ }).click();
  await expect(
    page.getByRole("button", {
      name: "Replace Malignant Force in slot 2",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator("main").getByRole("alert")).toHaveCount(0);
  await expect(
    tray.getByRole("button", { name: /Malignant Force/ }),
  ).toHaveCount(0);
  const before = await page.locator('[data-metric="sustainedDps"]').innerText();
  await page.getByLabel("Rank for Malignant Force").selectOption("0");
  await expect(page.locator('[data-metric="sustainedDps"]')).not.toHaveText(
    before,
  );
  const source = page.getByRole("button", {
    name: "Replace Malignant Force in slot 2",
    exact: true,
  });
  await source.dragTo(
    page.getByRole("button", {
      name: "Replace Vile Acceleration in slot 1",
      exact: true,
    }),
  );
  await expect(
    page.getByRole("button", {
      name: "Replace Malignant Force in slot 1",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Replace Vile Acceleration in slot 2",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Minimize tray" }).click();
  await expect(tray.getByRole("button")).toHaveCount(1);
  await page.getByLabel("TTK target").selectOption("Corpus");
  await expect(
    page.getByRole("region", { name: "Expected time to kill" }),
  ).toContainText("selected faction target");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
