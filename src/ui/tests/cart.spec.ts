import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/ProductsPage";
import { handleGoogleAds } from 'ui/pages/handleGoogleAds';
import { SignupPage } from 'ui/pages/signup.page';
import { CreateAccountPage } from 'ui/pages/CreateAccountPage';
import { usersData } from 'ui/data/dataset';
import { placeOrders } from 'ui/pages/placeOrder';
import { DeleteAccountPage } from 'ui/pages/DeleteAccountPage';
import { RegisterPage } from 'ui/pages/RegisterPage';


test.describe('Cart:', () => {
	test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        const handleGoogleAdds = await new handleGoogleAds(page); 
        await handleGoogleAdds.handleMultipleGoogleAds();
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
	test('Verify address details in checkout page', async ({ page }) => {
		const signupPage = new SignupPage(page);  
		const homePage = new HomePage(page);
		await homePage.clickSignupLoginButton()
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
	  
		await expect(page.locator('div.recommended_items h2[class="title text-center"]')).toBeVisible();
		await page
			.locator('div.recommended_items a[class="btn btn-default add-to-cart"]')
			.first()
			.click();
		const Products = new ProductPage(page);
		await Products.continueShopping();
		await homePage.clickCartButton();
		await expect(page.locator('div[class="table-responsive cart_info"]')).toBeVisible();

		const placesOrder = new placeOrders(page);  
        await placesOrder.proceedToCheckout();
        await expect(page.locator('//*[contains(text(),"Address Details")]')).toBeVisible();
        await expect(page.locator('//*[contains(text(),"Review Your Order")]')).toBeVisible();
		await placesOrder.validateDeliveryAddress(usersData);
		await placesOrder.validateBillingAddress(usersData);
		
		const deleteAccountPage = new DeleteAccountPage(page);
        await homePage.clickDeleteAccountLink();
        await deleteAccountPage.clickContinueButton();
	});
});