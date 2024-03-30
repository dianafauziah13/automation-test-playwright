import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/ProductsPage";
import { usersData } from "../data/review";

test.describe('Products:', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
    
        const homePageLogo = await homePage.getLogo();
        await expect(homePageLogo).toBeVisible();
        await homePage.clickPorductButton();

        const Products = new ProductPage(page);
        const getAllProductText = await Products.getAllProductText();
        await expect(getAllProductText).toBeVisible();
	});

    test('Verify All Products and product detail page', async ({ page }) => {
        await expect(page.locator('div[class="features_items"]')).toBeVisible();
        await page.locator('i[class="fa fa-plus-square"]').first().click();

        await expect(page.locator('div[class="product-information"] h2')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Category:")]')).toBeVisible();
        await expect(page.locator('div[class="product-information"] span span')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Availability:")]')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Condition:")]')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Brand:")]')).toBeVisible();
    });

    test('Add review on product', async ({ page }) => {
		await expect(page.locator('div[class="features_items"]')).toBeVisible();
		await page.locator('i[class="fa fa-plus-square"]').first().click();
        
        const Products = new ProductPage(page);
        await Products.fillReviewForm(usersData.name, usersData.email, usersData.review);
        await Products.clickReviewButton();
		await expect(page.locator('//*[contains(text(),"Thank you for your review.")]')).toBeVisible();
	});
});