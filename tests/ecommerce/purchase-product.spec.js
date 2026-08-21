import { test, expect } from '../../fixtures/testFixtures';

test('Add backpack to cart', async ({ productPage }) => {

    await productPage.navigate();

    await productPage.verifyProductsPage();

    await productPage.addProduct(
        'Sauce Labs Backpack'
    );

    await productPage.openCart();

    await productPage.verifyProduct('Sauce Labs Backpack');
});