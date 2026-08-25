import { test, expect } from '../../fixtures/testFixtures';

test('Add one more backpack to cart ', async ({ productPage }) => {
    //smoke test deleted
    await productPage.navigate();

    await productPage.verifyProductsPage();

    await productPage.addProduct(
        'Sauce Labs Fleece Jacket'
    );

    await productPage.openCart();

    await productPage.verifyProduct('Sauce Labs Fleece Jacket');
});