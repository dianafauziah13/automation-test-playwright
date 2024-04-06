import { Page } from "@playwright/test";

export class DeleteAccountPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle() {
    return this.page.getByText("Account Deleted!");
  }

  async clickContinueButton() {
    // const continueButton = this.page.getByRole("link", {
    //   name: "Continue",
    // });

    // await continueButton.click();
    await this.page.click('a[data-qa="continue-button"]');
  }
}