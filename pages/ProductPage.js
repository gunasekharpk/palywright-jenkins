import { expect } from '@playwright/test';

export class ProductPage {

    constructor(page) {

        this.page = page;

        this.productsTitle =
            page.getByText('Products');

        this.cartLink =
            page.locator(
                '[data-test="shopping-cart-link"]'
            );
    }

    async navigate() {
    await this.page.goto('/inventory.html');
  }

    async verifyProductsPage() {
        console.log('Current URL:', this.page.url());
        await expect(this.productsTitle)
            .toBeVisible();
    }

    async openCart() {

        await this.cartLink.click();

    }

    async addProduct(productName) {

        const product = this.page
            .locator('.inventory_item')
            .filter({
                hasText: productName
            });

        await product
            .getByRole('button', {
                name: 'Add to cart'
            })
            .click();
    }

    async verifyProduct(productName){
        await expect(
        this.page.getByText(productName)).toBeVisible();
    }
}