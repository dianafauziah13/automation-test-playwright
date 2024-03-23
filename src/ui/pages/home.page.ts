import { Page } from "@playwright/test";

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async getLogo() {
    return this.page.getByAltText("Website for automation practice");
  }

  async clickSignupLoginButton() {
    const signupLoginButton = this.page.getByText("Signup / Login");

    await signupLoginButton.click();
  }

  async getLoggedInText() {
    return this.page.getByText(`Logged in as `);
  }
}