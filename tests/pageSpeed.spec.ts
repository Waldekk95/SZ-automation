import { test, expect } from "@playwright/test";

test("should load homepage within acceptable time", async ({ page }) => {
	const start = Date.now();
	await page.goto("https://www.strefazajec.pl/");
	const end = Date.now();
	const loadTime = end - start;
	console.log(`Page load time: ${loadTime}ms`);
	expect(loadTime).toBeLessThan(3000); // Strona powinna załadować się w mniej niż 3 sekundy
});
