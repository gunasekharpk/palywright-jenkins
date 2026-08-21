import { test as setup } from '@playwright/test';

setup('authenticate customer', async ({ page }) => {

    await page.goto('/');

    await page.getByPlaceholder('Username')
        .fill(process.env.TEST_USERNAME);

    await page.getByPlaceholder('Password')
        .fill(process.env.PASSWORD);

    await page.getByRole('button', {
                name: 'Login'
            }).click();

    await page.context().storageState({
        path: 'playwright/.auth/customer.json'
    });
});