import { test, expect } from "@playwright/test";

test("homepage loads with hero content", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Reliable Freight Transportation/i })
  ).toBeVisible();
});

test("header navigation links exist", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Services" }).first()).toBeVisible();
});

test("mobile menu opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("quote form shows validation errors on empty submit", async ({ page }) => {
  await page.goto("/#quote");
  await page.getByRole("button", { name: "Request a Quote" }).click();
  await expect(page.getByText("Full name is required")).toBeVisible();
});

test("appointment form shows validation errors on empty submit", async ({ page }) => {
  await page.goto("/#appointment");
  await page.getByRole("button", { name: "Book Appointment" }).click();
  await expect(page.getByText("Full name is required")).toBeVisible();
});

test("footer contact links exist", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "+1 (914) 507-6206" }).first()).toHaveAttribute(
    "href",
    "tel:+19145076206"
  );
  await expect(page.getByRole("link", { name: "admin@wassinextmove.com" })).toHaveAttribute(
    "href",
    "mailto:admin@wassinextmove.com"
  );
});
