import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/signup.page";
import { CreateAccountPage } from "../pages/CreateAccountPage";
import { DeleteAccountPage } from "../pages/DeleteAccountPage";
import { usersData } from "../data/incorrectData";

test("Login User with incorrect email and password", async ({ page }) => {
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
  const getIncorrectTitle = await loginPage.getIncorrectTitle();
  await expect(getIncorrectTitle).toBeVisible();
  await page.waitForTimeout(5000)
});
