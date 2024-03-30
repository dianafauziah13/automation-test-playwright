import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/LoginPage";
import { usersData } from "../data/dataCorrectLogin";

test("Logout User", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  const homePageLogo = await homePage.getLogo();
  await expect(homePageLogo).toBeVisible();

  await homePage.clickSignupLoginButton();

  const loginPage = new LoginPage(page);
  const getLoginFormTitle = await loginPage.getLoginFormTitle();
  await expect(getLoginFormTitle).toBeVisible();

  await loginPage.fillLoginForm(usersData.email, usersData.password);
  await loginPage.clickLoginButton();

  const getLoggedUsername = await loginPage.getLoggedUsername();
  await expect(getLoggedUsername).toBeVisible();
  
  await loginPage.clickLogoutButton();
  await expect(getLoginFormTitle).toBeVisible();
  await page.waitForTimeout(5000)

});
