import { test, expect } from "@playwright/test";

test("should display correctly on mobile", async ({ page }) => {
	// Symulowanie urządzenia mobilnego (np. iPhone 11)
	const iPhone11 = {
		viewport: { width: 375, height: 812 },
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1",
	};
	await page.emulate(iPhone11);

	await page.goto("https://www.strefazajec.pl/");

	// Sprawdzenie, czy menu jest dostępne
	await page.click("button#menu-toggle");

	// Sprawdzenie, czy nawigacja działa na urządzeniu mobilnym
	await expect(page.locator("nav")).toBeVisible();
});
