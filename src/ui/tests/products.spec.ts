import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/ProductsPage";
import { handleGoogleAds } from 'ui/pages/handleGoogleAds';
import { usersReview } from "../data/review";
import { LoginPage } from 'ui/pages/LoginPage';
import { usersData } from 'ui/data/dataCorrectLogin';

test.describe('Products:', () => {
    test.beforeEach(async ({ page }) => {
        const handleGoogleAdds = await new handleGoogleAds(page); 
        const homePage = new HomePage(page);
        await homePage.navigate();
        await handleGoogleAdds.handleMultipleGoogleAds();

        const homePageLogo = await homePage.getLogo();
        await expect(homePageLogo).toBeVisible();
        await homePage.clickPorductButton();

        const Products = new ProductPage(page);
        await handleGoogleAdds.handleMultipleGoogleAds(); 
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
        await Products.fillReviewForm(usersReview.name, usersReview.email, usersReview.review);
        await Products.clickReviewButton();
		// await expect(page.locator('//*[contains(text(),"Thank you for your review.")]')).toBeVisible();
        await expect(page.getByText("Thank you for your review.")).toBeVisible();
	});

    test('Searct Products and Verify Cart after login', async ({ page }) => {
        const handleGoogleAdds = await new handleGoogleAds(page); 
		const Products = new ProductPage(page);
        await handleGoogleAdds.handleMultipleGoogleAds(); 
        const getAllProductText = await Products.getAllProductText();
        await expect(getAllProductText).toBeVisible();

        const search = "green";
        const products: { productName: string }[] = [];

        await page.getByPlaceholder('Search Product').fill(search);
        await page.locator("#submit_search").click();
        await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
        const totalSearch = await page.locator('.single-products').count();
        const productSearch = await page.locator('.single-products').getByText(search).count() / 2;
        await expect(totalSearch).toBe(productSearch);

        // const productId = await page.locator('a.add-to-cart').getAttribute('data-product-id');
        for ( let i = 0; i < totalSearch; i++ ) {
            const productName = await page.locator(".single-products").nth(i).locator(".productinfo > p").textContent();
            // add product to cart
            await page.locator(".single-products").nth(i).hover();
            // await page.locator(".productinfo > .btn").nth(i).click();
            // await page.click(`a.add-to-cart[data-product-id="${productId}"]`);
            await page.locator('div.features_items a[class="btn btn-default add-to-cart"]').nth(i+1).click();
            await Products.continueShopping();
            (productName) && products.push({ productName });
        }
        const homePage = new HomePage(page);
        homePage.clickCartButton();

        // verify that products are visible in cart
        await expect(page.locator('div[class="features_items"]')).toBeVisible();
        // for (let i = 0; i < totalSearch; i++) {
        //     await expect( await page.locator(`tbody > tr:nth-child(${ i + 1 }) > td:nth-child(2) > h4`).textContent() ).toBe( products[i].productName );
        //     await expect(await page.locator("tbody > tr:nth-child(1) > td:nth-child(2) > h4").textContent()).toBe(products[i].productName);
        // }
        await homePage.clickSignupLoginButton();
        const loginPage = new LoginPage(page);
        const getLoginFormTitle = await loginPage.getLoginFormTitle();
        await expect(getLoginFormTitle).toBeVisible();
      
        await loginPage.fillLoginForm(usersData.email, usersData.password);
        await loginPage.clickLoginButton();
        homePage.clickCartButton();
        // verify againthat products are visible in cart
        // for (let i = 0; i < totalSearch; i++) {
        //     await expect(await page.locator("tbody > tr:nth-child(1) > td:nth-child(2) > h4").textContent() ).toBe(products[i].productName);
        // }
        await expect(page.locator('div[class="table-responsive cart_info"]')).toBeVisible();
	});
});