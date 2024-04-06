import { Page } from "@playwright/test";

export interface FormValues {
    NameOnCard: string;
    cardNumber: string;
    CVC: string;
    exporationM: string; 
    exporationY: string;  
}

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/view_cart");
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

  async fillPaymentForm(usersData: FormValues) {
    await this.page.fill('input[data-qa="name-on-card"]', usersData.NameOnCard);
    await this.page.fill('input[data-qa="card-number"]', usersData.cardNumber);
    await this.page.fill('input[data-qa="cvc"]', usersData.CVC);
    await this.page.fill('input[data-qa="expiry-month"]', usersData.exporationM);
    await this.page.fill('input[data-qa="expiry-year"]', usersData.exporationY);
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  }

}

