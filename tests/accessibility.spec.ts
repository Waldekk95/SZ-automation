// import { test, expect } from "@playwright/test";
// const axeCore = require("axe-core");

// test("should pass accessibility tests", async ({ page }) => {
// 	await page.goto("https://www.strefazajec.pl/");

// 	// Sprawdzanie dostępności strony za pomocą narzędzia Axe
// 	const results = await page.evaluate(() => {
// 		return new Promise((resolve) => {
// 			axe.run(document, {}, (err, results) => {
// 				resolve(results);
// 			});
// 		});
// 	});

// 	expect(results.violations).toHaveLength(0); // Strona nie powinna mieć żadnych problemów z dostępnością
// });
