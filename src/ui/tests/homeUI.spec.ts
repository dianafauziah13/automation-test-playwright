import { test, expect, type Page } from '@playwright/test';
import { HomePage } from "../pages/home.page";
import { usersData } from "../data/subsribe";


test ( 'home page', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  const pageURL= page.url();
  console.log('page url is:', pageURL);
  await expect(page).toHaveURL('https://automationexercise.com/');

  await page.close();
});

test('Verify Subscription in home page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  const homePageLogo = await homePage.getLogo();
  await expect(homePageLogo).toBeVisible();

  await page.locator('#susbscribe_email').click();
  await homePage.fillSubscribe(usersData.email);
  // await page.type('#susbscribe_email',);
  await page.locator('#subscribe').click();
  const successfullySubsribe = await homePage.getSuccesSubsribeText()
  await expect (successfullySubsribe).toBeVisible();
});