import { Page } from "@playwright/test";

export interface FormValues {
  title: "Mr." | "Mrs.";
  name: string;
  email: string;
  password: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  signupNewsletter: boolean;
  receiveOffers: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}
export class SignupPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/signup");
  }

  async getAccountInfoFormTitle() {
    return this.page.getByText("ENTER ACCOUNT INFORMATION");
  }

  async getValueFromNameField() {
    return this.page.getByLabel("Name *", { exact: true }).inputValue();
  }

  async getValueFromEmailField() {
    return this.page.getByLabel("Email *", { exact: true }).inputValue();
  }

  async fillAccountInfoForm(usersData: FormValues) {
    // Checking Mr. or Mrs.
    if (usersData.title === "Mrs.") {
      await this.page.check('input[id="id_gender1"]');
    } else await this.page.check('input[id="id_gender2"]');
    // Filling password
    await this.page.fill('input[data-qa="password"]', usersData.password);

    // Selecting DOB
    await this.page.locator("#days").selectOption(usersData.dob.day);
    await this.page.locator("#months").selectOption(usersData.dob.month);
    await this.page.locator("#years").selectOption(usersData.dob.year);

    // Selecting checkboxes
    if (usersData.signupNewsletter === true) {
      await this.page.check('input[name="newsletter"]');
    }
    if (usersData.receiveOffers === true) {
      await this.page.check('input[name="optin"]');
    }
  }
  async fillAddressInfoForm(usersData: FormValues) {
    // Filling address information section in form
    await this.page.fill('input[name="first_name"]', usersData.firstName);
    await this.page.fill('input[name="last_name"]', usersData.lastName);
    await this.page.fill('input[name="company"]', usersData.company);
    await this.page.fill('input[name="address1"]', usersData.address);
    await this.page.fill('input[name="address2"]', usersData.address2);
    await this.page.locator("#country").selectOption(usersData.country);
    await this.page.fill('input[name="state"]', usersData.state);
    await this.page.fill('input[name="city"]', usersData.city);
    await this.page.fill('input[name="zipcode"]', usersData.zipcode);
    await this.page.fill('input[name="mobile_number"]', usersData.mobileNumber);
  }

  async clickCreateAccountButton() {
    const createAccountButton = this.page.getByRole("button", {
      name: "Create Account",
    });

    await createAccountButton.click();
  }
}