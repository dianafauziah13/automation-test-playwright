import { Page } from "@playwright/test";

export interface FormValues {
    email: string;
    password: string;
}

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/login");
  }

  async getSignupFormTitle() {
    return this.page.getByText("New User Signup!");
  }

  async getLoginFormTitle() {
    return this.page.getByText("Login to your account");
  }

  async getIncorrectTitle() {
    return this.page.getByText("Your email or password is incorrect!");
  }

  async fillSignupForm(name: string, email: string) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
  }

  async fillLoginForm(email: string, password: string) {
    await this.page.fill('input[data-qa="login-email"]', email);
    await this.page.fill('input[data-qa="login-password"]', password);
  }


  async clickSignupButton() {
    const signupButton = this.page.getByRole("button", { name: "Signup" });
    await signupButton.click();
  }

  async clickLoginButton() {
    const LoginButton = this.page.getByRole("button", { name: "Login" });
    await LoginButton.click();
  }

  async clickDeleteAccountLink() {
    const deleteAccountLink = this.page.getByRole("link", {
      name: "Delete Account",
    });



    await deleteAccountLink.click();
  }
}