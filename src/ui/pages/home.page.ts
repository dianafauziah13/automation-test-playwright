import { Page } from "@playwright/test";

export interface FormValues {
  email: string;
}

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

  async clickCartButton(){
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }

  async clickPorductButton() {
    const ProductButton = this.page.getByText("Products");

    await ProductButton.click();
  }

  async getLoggedInText() {
    return this.page.getByText(`Logged in as `);
  }

  async getSuccesSubsribeText() {
    return this.page.getByText(`You have been successfully subscribed!`);
  }


  async fillSubscribe(email: string) {
    await this.page.fill('#susbscribe_email', email);
  }

  async clickDeleteAccountLink() {
    const deleteAccountLink = this.page.getByRole("link", {
      name: "Delete Account",
    });

    await deleteAccountLink.click();
  }

  async scrollToBottom () {
    await this.page.mouse.wheel(0,10000);
  }

}