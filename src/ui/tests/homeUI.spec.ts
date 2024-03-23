import { test, expect, type Page } from '@playwright/test';

test ( 'home page', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  const pageURL= page.url();
  console.log('page url is:', pageURL);
  await expect(page).toHaveURL('https://automationexercise.com/');

  await page.close();
});