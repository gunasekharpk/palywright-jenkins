import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Successful login', async ({ page }) => {

    await page.goto('/');

    const loginPage = new LoginPage(page);

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory/);

    await expect(
        page.getByText('Products')
    ).toBeVisible();
});