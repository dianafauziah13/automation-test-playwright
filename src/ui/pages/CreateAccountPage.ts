import { Page } from "@playwright/test";

export class CreateAccountPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle() {
    return this.page.getByText("ACCOUNT CREATED!");
  }

  async clickContinueButton() {
    const continueButton = this.page.getByRole("link", {
      name: "Continue",
    });

    await continueButton.click();
  }
}