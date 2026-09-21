import { expect, test } from "@playwright/test";

test("validates consent, draws a reward, and copies the code", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Turn a costly click/ })).toBeVisible();
  await page.getByLabel("Work email").fill("buyer@example.com");
  await page.getByRole("button", { name: "Unlock my play" }).click();
  await expect(page.locator(".error[role='alert']")).toContainText("Consent is required");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Unlock my play" }).click();
  await expect(page.getByText("You unlocked")).toBeVisible();
  await page.getByRole("button", { name: "Copy reward code" }).click();
  await expect(page.getByRole("button", { name: "Code copied" })).toBeVisible();
  await expect(page.getByText("129")).toBeVisible();
});

test("switches campaign preview and rejects invalid email", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /VIP scratch reveal/ }).click();
  await expect(page.getByRole("heading", { name: "VIP scratch reveal" })).toBeVisible();
  await page.getByLabel("Work email").fill("bad");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Unlock my play" }).click();
  await expect(page.locator(".error[role='alert']")).toContainText("valid email");
});

test("mobile workflow has no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await page.getByLabel("Work email").fill("mobile@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Unlock my play" }).click();
  await expect(page.getByText("You unlocked")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
});
