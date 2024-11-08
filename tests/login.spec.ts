import { test, expect } from "@playwright/test";

test("should log in with valid credentials", async ({ page }) => {
	await page.goto("https://www.strefazajec.pl/login");

	// Wypełnienie formularza logowania poprawnymi danymi
	await page.fill('input[name="email"]', "validuser@example.com");
	await page.fill('input[name="password"]', "validPassword123");
	await page.click('button[type="submit"]');

	// Sprawdzenie, czy użytkownik został zalogowany
	await expect(page).toHaveURL("https://www.strefazajec.pl/dashboard");
	await expect(page.locator("text=Moje wydarzenia")).toBeVisible();
});

test("should show error on invalid login", async ({ page }) => {
	await page.goto("https://www.strefazajec.pl/login");

	// Wypełnienie formularza błędnymi danymi
	await page.fill('input[name="email"]', "invaliduser@example.com");
	await page.fill('input[name="password"]', "wrongPassword");
	await page.click('button[type="submit"]');

	// Sprawdzenie komunikatu o błędzie
	await expect(
		page.locator("text=Nieprawidłowy login lub hasło")
	).toBeVisible();
});
