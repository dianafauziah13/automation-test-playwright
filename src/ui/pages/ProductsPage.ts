import { Page } from "@playwright/test";

export interface FormValues {
    email: string;
    name: string;
    review: string;
}

export class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/products");
  }

  async getAllProductText() {
    return this.page.getByText("All Products");
  }

  async fillReviewForm(name: string, email: string, review: string) {
    // Playwright code to fill the input field
    await this.page.fill('#name', name);
    await this.page.fill('#email', email);
    await this.page.fill('#review', review);
  }

  async clickReviewButton() {
    const reviewButton = this.page.getByRole("button", { name: "Submit" });
    await reviewButton.click();
  }
}