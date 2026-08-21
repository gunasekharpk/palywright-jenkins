import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';

export const test = base.extend({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

 
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

 /* productPage: async ({ page }, use) => {
    // 1. Auto-navigate before passing the page object to tests
    await page.goto('/inventory.html');

    // 2. Instantiate and pass page object
    const productPage = new ProductPage(page);
    await use(productPage);
  },*/
});

export { expect };