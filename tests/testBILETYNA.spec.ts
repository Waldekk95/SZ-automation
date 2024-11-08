import { test, expect } from "@playwright/test";

test.describe("Formularz kontaktowy - Biletyna", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("https://biletyna.pl/contact");
	});

	// 1. Test sprawdzający poprawność wyświetlania formularza kontaktowego
	test("Sprawdzenie widoczności elementów formularza", async ({ page }) => {
		await expect(page.locator('input[name="name"]')).toBeVisible();
		await expect(page.locator('input[name="email"]')).toBeVisible();
		await expect(page.locator('input[name="phone"]')).toBeVisible();
		await expect(page.locator('textarea[name="message"]')).toBeVisible();
		await expect(page.locator('button[type="submit"]')).toBeVisible();
	});

	// 2. Test walidacji pola email
	test("Wprowadzenie niepoprawnego adresu email", async ({ page }) => {
		await page.fill('input[name="name"]', "Jan Kowalski");
		await page.fill('input[name="email"]', "jan.kowalski@niepoprawny-email");
		await page.fill('input[name="phone"]', "123456789");
		await page.fill('textarea[name="message"]', "Testowa wiadomość");

		await page.click('button[type="submit"]');

		// Sprawdzenie, czy pojawia się komunikat o błędzie dla pola email
		const emailError = await page.locator(".error-message-email");
		await expect(emailError).toBeVisible();
		await expect(emailError).toHaveText("Podaj poprawny adres email");
	});

	// 3. Test przesyłania formularza z poprawnymi danymi
	test("Przesłanie formularza z poprawnymi danymi", async ({ page }) => {
		await page.fill('input[name="name"]', "Jan Kowalski");
		await page.fill('input[name="email"]', "jan.kowalski@test.com");
		await page.fill('input[name="phone"]', "123456789");
		await page.fill('textarea[name="message"]', "To jest testowa wiadomość.");

		await page.click('button[type="submit"]');

		// Sprawdzenie komunikatu potwierdzającego wysłanie formularza
		const successMessage = await page.locator(".success-message");
		await expect(successMessage).toBeVisible();
		await expect(successMessage).toHaveText(
			"Wiadomość została wysłana pomyślnie"
		);
	});

	// 4. Test wysyłania formularza bez wymaganych pól
	test("Próba wysłania formularza bez wypełnienia wymaganych pól", async ({
		page,
	}) => {
		await page.click('button[type="submit"]');

		// Sprawdzenie komunikatów o błędach
		const nameError = await page.locator(".error-message-name");
		const emailError = await page.locator(".error-message-email");
		const messageError = await page.locator(".error-message-message");

		await expect(nameError).toBeVisible();
		await expect(emailError).toBeVisible();
		await expect(messageError).toBeVisible();
		await expect(nameError).toHaveText("Pole Imię jest wymagane");
		await expect(emailError).toHaveText("Pole Email jest wymagane");
		await expect(messageError).toHaveText("Pole Wiadomość jest wymagane");
	});

	// 5. Test maksymalnej liczby znaków w polu wiadomości
	test("Sprawdzenie limitu znaków w polu Wiadomość", async ({ page }) => {
		const longMessage = "a".repeat(2001); // Zakładamy limit 2000 znaków

		await page.fill('textarea[name="message"]', longMessage);
		const messageValue = await page
			.locator('textarea[name="message"]')
			.inputValue();

		// Sprawdzenie, czy pole przyjmuje maksymalnie 2000 znaków
		expect(messageValue.length).toBeLessThanOrEqual(2000);
	});
});
