import { test, expect } from "@playwright/test";

test("should register a new user successfully", async ({ page }) => {
	await page.goto("https://www.strefazajec.pl/rejestracja");

	await page.fill('input[name="email"]', "test@example.com");
	await page.fill('input[name="password"]', "StrongPassword123");
	await page.fill('input[name="confirmPassword"]', "StrongPassword123");

	await page.click('button[type="submit"]');

	// Sprawdź, czy pojawił się komunikat o pomyślnym zarejestrowaniu
	await expect(page).toHaveText("Rejestracja zakończona sukcesem");
});
