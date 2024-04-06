import { test, expect } from "@playwright/test";
import { handleGoogleAds } from "ui/pages/handleGoogleAds";
import { HomePage } from "ui/pages/home.page";

test.describe("Scroll up", () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        const handleGoogleAdds = await new handleGoogleAds(page); 
        await handleGoogleAdds.handleMultipleGoogleAds();
        const homePageLogo = await homePage.getLogo();
        await expect(homePageLogo).toBeVisible();
    });
    test("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async({ page }) => {
    
      const homePage = new HomePage(page);
      await homePage.scrollToBottom();
      await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
  
      // Minimize footer ad
      if (await page.locator(".grippy-host").isVisible()) {
        await page.locator(".grippy-host").click();
      }
  
      await page.locator("#scrollUp").click();
      
      // Wait until the page scrolls up
      await page.waitForTimeout(2000);
      
      const isScrolledUp = await page.evaluate(() => {
        return window.scrollY === 0;
      });
      await expect(isScrolledUp).toBe(true);
  
      await expect(page.locator("#slider-carousel").locator(".active").getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
    });
    
  });