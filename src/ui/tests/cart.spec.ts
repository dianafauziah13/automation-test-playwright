import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/ProductsPage";

test.describe('Cart:', () => {
	test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
    
        const homePageLogo = await homePage.getLogo();
        await expect(homePageLogo).toBeVisible();
	});

	test('Add to cart from Recommended items', async ({ page }) => {
		await expect(page.locator('div.recommended_items h2[class="title text-center"]')).toBeVisible();
		await page
			.locator('div.recommended_items a[class="btn btn-default add-to-cart"]')
			.first()
			.click();
		await page.click('//*[contains(text(),"View Cart")]');
		await expect(page.locator('tr[id*=product]')).toBeVisible();
	});
});