import { expect, Page} from "@playwright/test";

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
// import { handleMultipleGoogleAds } from "./helper";

export class placeOrders{
    private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async addProductToCart(){
    await this.page.locator(".single-products").hover();
    await this.page.locator('.productinfo > .btn').click();  
  }
  async continueShopping(){
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }
  async viewCart(){
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }
  async goToCartSection (){
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }
  async proceedToCheckout(){
    await this.page.getByText('Proceed To Checkout').click();
  }
  async placeDescription(){
    await this.page.locator('textarea[name="message"]').fill( "with the blue color of t-sirt" );
  }
  async placeOrder(){
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }

  async orderConfirmed(){
   return await this.page.getByText("Congratulations! Your order has been confirmed!");
  }

  async validateDeliveryAddress(user:FormValues){
    // let firstName = user.firstName + user.lastName;
    const company = user.company;
    const first_address = user.address;
    const second_address = user.address2;
    const location = user.city + " " + user.state + " " + user.zipcode;
    const country = user.country;
    const phone = user.mobileNumber;

    // await expect(await this.page.locator('#address_delivery').locator(".address_firstname").textContent())       .toBe( firstName );
    // await expect(await this.page.locator('#address_delivery').locator(".address_address1").nth(0).textContent()) .toBe( company );
    // await expect(await this.page.locator('#address_delivery').locator(".address_address1").nth(1).textContent()) .toBe( first_address );
    // await expect(await this.page.locator('#address_delivery').locator(".address_address1").nth(2).textContent()) .toBe( second_address );
    
    // const aux = await this.page.locator('#address_delivery') .locator(".address_city").textContent();
    // let cleanLocation = "";
    // if ( aux ) {
    //   cleanLocation = aux.replace(/\n/g, ' ').replace(/\t/g, '');
    // }
    // await expect(cleanLocation).toBe( location );
    // await expect(await this.page.locator('#address_delivery').locator(".address_country_name").textContent()).toBe( country );
    // await expect(await this.page.locator('#address_delivery').locator(".address_phone").textContent()).toBe( phone );
    await expect(await this.page.locator('#address_delivery').locator(".address_country_name").textContent())       .toBe( "United States" )
  }

  async validateBillingAddress(user: FormValues){
    let firstName = user.firstName;
    const company = user.company;
    const first_address = user.address;
    const second_address = user.address2;
    const location = user.city + " " + user.state + " " + user.zipcode;
    const country = user.country;
    const phone = user.mobileNumber;
  
    // Billing Address validation
    // await expect(await this.page.locator('#address_invoice').locator(".address_firstname").textContent())       .toBe( firstName );
    // await expect(await this.page.locator('#address_invoice').locator(".address_address1").nth(0).textContent()) .toBe( company );
    // await expect(await this.page.locator('#address_invoice').locator(".address_address1").nth(1).textContent()) .toBe( first_address );
    // await expect(await this.page.locator('#address_invoice').locator(".address_address1").nth(2).textContent()) .toBe( second_address );
    
    // const aux = await this.page.locator('#address_invoice') .locator(".address_city").textContent();
    // let cleanLocation = "";
    // if ( aux ) {
    //   cleanLocation = aux.replace(/\n/g, ' ').replace(/\t/g, '');
    // }
    // await expect(cleanLocation).toBe( location );
    await expect(await this.page.locator('#address_invoice').locator(".address_country_name").textContent()).toBe( "United States" );
    // await expect(await this.page.locator('#address_invoice').locator(".address_phone").textContent()).toBe( phone );
  }

}

