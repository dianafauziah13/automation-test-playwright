import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/RegisterPage";
import { usersData } from "../data/dataset";
import { CreateAccountPage } from 'ui/pages/CreateAccountPage';
import { CartPage } from 'ui/pages/CartPage';
import { usersPayment } from "../data/paymentDetails";

test.describe('Register:', () => {
	test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
    
        const homePageLogo = await homePage.getLogo();
        await expect(homePageLogo).toBeVisible();
	});

	test('Place Order: Register While Checkout', async ({ page }) => {
		await page
			.locator('div.recommended_items a[class="btn btn-default add-to-cart"]')
			.first()
			.click();
		await page.click('//*[contains(text(),"View Cart")]');
		await expect(page.locator('tr[id*=product]')).toBeVisible();

        await page.click('.check_out');
        await page.click('text=Register / Login');

        const registerPage = new RegisterPage(page);
        await registerPage.navigate();

        await registerPage.fillSignForm(usersData);
        await registerPage.clickSignup();

        await registerPage.fillAccountInfoForm(usersData);
        await registerPage.fillAddressInfoForm(usersData);
        await registerPage.clickCreateAccountButton();
        
        const createAccountPage = new CreateAccountPage(page);
        const accountCreatedTitle = await createAccountPage.getPageTitle();
        await expect(accountCreatedTitle).toBeVisible();
        await createAccountPage.clickContinueButton();

        const homePage = new HomePage(page);
        const loggedInText = await homePage.getLoggedInText();
        await expect(loggedInText).toHaveText(`Logged in as ${usersData.name}`);
        await expect(loggedInText).toBeVisible();
       
        await homePage.clickCartButton();
        await page.click('.check_out');

        await expect(page.locator('//*[contains(text(),"Address Details")]')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Review Your Order")]')).toBeVisible();

        await page.fill('textarea[name="message"]', 'with the blue color of t-sirt');
        await page.click('a.check_out[href="/payment"]');

        const cartPage = new CartPage(page);
        await cartPage.fillPaymentForm(usersPayment);
        await page.click('button[data-qa="pay-button"]');

	});
});