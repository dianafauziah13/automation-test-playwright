import { Page } from "@playwright/test";

export class handleGoogleAds {
    private page: Page;

    constructor(page: Page) {
      this.page = page;
    }

    async handleOneGoogleAds(){
        if ( await this.page.url().includes("google_vignette") ){
            await this.page.getByLabel('Close ad').click();
          }
    }
    async handleMultipleGoogleAds(){
        if ( await this.page.url().includes("google_vignette") ){
            for ( let i = 0; i <= 9; i++ ) {
              if ( await this.page.frameLocator(`#aswift_${i}`).frameLocator("#ad_iframe").getByText('Close').isVisible({timeout : 2000}) ) {
                const firstFrame = await this.page.frameLocator(`#aswift_${i}`);
                await firstFrame.frameLocator("#ad_iframe").getByText('Close').click();
                return ;
              }
            }
            for ( let i = 0; i <= 9; i++ ) {
              if ( await this.page.frameLocator(`#aswift_${i}`).locator("#dismiss-button").first().isVisible({timeout : 2000}) ) {
                await this.page.frameLocator(`#aswift_${i}`).locator("#dismiss-button").first().click();
                return ;
              }
            }
            if ( await this.page.locator("#dismiss-button").first().isVisible({timeout : 2000}) ) {
              await this.page.locator("#dismiss-button").first().click();
              return ;
            }
            if ( await this.page.getByLabel("Close ad").isVisible({timeout : 2000}) ) {
              await this.page.getByLabel("Close ad").click();
              return ;
            }
          }
    }
}
