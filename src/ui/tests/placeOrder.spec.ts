import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/RegisterPage";
import { usersData } from "../data/dataset";
import { CreateAccountPage } from 'ui/pages/CreateAccountPage';
import { CartPage } from 'ui/pages/CartPage';
import { usersPayment } from "../data/paymentDetails";
import { placeOrders } from 'ui/pages/placeOrder';
import { DeleteAccountPage } from 'ui/pages/DeleteAccountPage';
import { handleGoogleAds } from 'ui/pages/handleGoogleAds';
import { LoginPage } from 'ui/pages/LoginPage';

test.describe('Place Order:', () => {
	test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        const handleGoogleAdds = await new handleGoogleAds(page); 
        await handleGoogleAdds.handleMultipleGoogleAds();
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
        await page.click('p.text-center a[href="/login"] u');

        const registerPage = new RegisterPage(page);
        // await registerPage.navigate();
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
       
        const placesOrder = new placeOrders(page);  
        await homePage.clickCartButton();
        await placesOrder.proceedToCheckout();

        await expect(page.locator('//*[contains(text(),"Address Details")]')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Review Your Order")]')).toBeVisible();

        // await page.fill('textarea[name="message"]', 'with the blue color of t-sirt');
        await placesOrder.placeDescription();
        await page.click('a.check_out[href="/payment"]');

        const cartPage = new CartPage(page);
        await cartPage.fillPaymentForm(usersPayment);
        const getOrderConfirmed = await placesOrder.orderConfirmed();
        await expect(getOrderConfirmed).toBeVisible()

        const handleGoogleAdds = await new handleGoogleAds(page); 

        const deleteAccountPage = new DeleteAccountPage(page);
        handleGoogleAdds.handleMultipleGoogleAds();
        const accountDeletedTitle = await deleteAccountPage.getPageTitle();
        // await expect(accountDeletedTitle).toBeVisible();
        await homePage.clickDeleteAccountLink();
        await deleteAccountPage.clickContinueButton();

	});


    test('Register before Checkout', async ({ page }) => {
        const homePage = new HomePage(page);  
        await homePage.clickSignupLoginButton();
        const registerPage = new RegisterPage(page);
        // await registerPage.navigate();
        await registerPage.fillSignForm(usersData);
        await registerPage.clickSignup();

        await registerPage.fillAccountInfoForm(usersData);
        await registerPage.fillAddressInfoForm(usersData);
        await registerPage.clickCreateAccountButton();
        
        const createAccountPage = new CreateAccountPage(page);
        const accountCreatedTitle = await createAccountPage.getPageTitle();
        await expect(accountCreatedTitle).toBeVisible();
        await createAccountPage.clickContinueButton();

        const loggedInText = await homePage.getLoggedInText();
        await expect(loggedInText).toHaveText(`Logged in as ${usersData.name}`);
        await expect(loggedInText).toBeVisible();
    
            await page
            .locator('div.recommended_items a[class="btn btn-default add-to-cart"]')
            .first()
            .click();
        await page.click('//*[contains(text(),"View Cart")]');
        await expect(page.locator('tr[id*=product]')).toBeVisible();

        await page.click('.check_out');

        const placesOrder = new placeOrders(page);  
        await homePage.clickCartButton();
        await placesOrder.proceedToCheckout();

        await expect(page.locator('//*[contains(text(),"Address Details")]')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Review Your Order")]')).toBeVisible();

        // await page.fill('textarea[name="message"]', 'with the blue color of t-sirt');
        await placesOrder.placeDescription();
        await page.click('a.check_out[href="/payment"]');

        const cartPage = new CartPage(page);
        await cartPage.fillPaymentForm(usersPayment);
        const getOrderConfirmed = await placesOrder.orderConfirmed();
        await expect(getOrderConfirmed).toBeVisible()

        const handleGoogleAdds = await new handleGoogleAds(page); 

        const deleteAccountPage = new DeleteAccountPage(page);
        handleGoogleAdds.handleMultipleGoogleAds();
        const accountDeletedTitle = await deleteAccountPage.getPageTitle();
        // await expect(accountDeletedTitle).toBeVisible();
        await homePage.clickDeleteAccountLink();
        await deleteAccountPage.clickContinueButton();
    });

    test('Login before Checkout', async ({ page }) => {
        const homePage = new HomePage(page);  
        await homePage.clickSignupLoginButton();

        const loginPage = new LoginPage(page);   
        await loginPage.fillLoginForm(usersData.email, usersData.password);
        await loginPage.clickLoginButton();
        const loggedInText = await homePage.getLoggedInText();
        await expect(loggedInText).toHaveText(`Logged in as ${usersData.name}`);
        await expect(loggedInText).toBeVisible();
    
            await page
            .locator('div.recommended_items a[class="btn btn-default add-to-cart"]')
            .first()
            .click();
        await page.click('//*[contains(text(),"View Cart")]');
        await expect(page.locator('tr[id*=product]')).toBeVisible();

        await page.click('.check_out');

        const placesOrder = new placeOrders(page);  
        await homePage.clickCartButton();
        await placesOrder.proceedToCheckout();

        await expect(page.locator('//*[contains(text(),"Address Details")]')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Review Your Order")]')).toBeVisible();

        // await page.fill('textarea[name="message"]', 'with the blue color of t-sirt');
        await placesOrder.placeDescription();
        await page.click('a.check_out[href="/payment"]');

        const cartPage = new CartPage(page);
        await cartPage.fillPaymentForm(usersPayment);
        const getOrderConfirmed = await placesOrder.orderConfirmed();
        await expect(getOrderConfirmed).toBeVisible()

        const handleGoogleAdds = await new handleGoogleAds(page); 

        const deleteAccountPage = new DeleteAccountPage(page);
        handleGoogleAdds.handleMultipleGoogleAds();
        const accountDeletedTitle = await deleteAccountPage.getPageTitle();
        // await expect(accountDeletedTitle).toBeVisible();
        await homePage.clickDeleteAccountLink();
        await deleteAccountPage.clickContinueButton();
    });
});