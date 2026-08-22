import { test, expect } from '../../fixtures/testFixtures';

test('Add one more backpack to cart @sanity', async ({ productPage }) => {

    // Verify add product functionality

    await productPage.navigate();

    await productPage.verifyProductsPage();

    await productPage.addProduct(
        'Sauce Labs Bike Light'
    );

    await productPage.openCart();

    await productPage.verifyProduct('Sauce Labs Bike Light');
});