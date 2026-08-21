import { test, expect } from '../../fixtures/testFixtures';
import loginData from '../../test-data/loginData.json';

for (const data of loginData) {

    test(`Login - ${data.testName}`, async ({ loginPage }) => {

        await loginPage.navigateToLoginPage();

        await loginPage.login(
            data.username,
            data.password
        );

        if (data.expected === 'success') {

            await expect(loginPage.page)
                .toHaveURL(/inventory.html/);

        } else {

            await expect(loginPage.errorMessage)
                .toBeVisible();
        }
    });
}