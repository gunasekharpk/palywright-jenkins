import { expect } from '@playwright/test';

export class LoginPage {


    constructor(page) {

        this.page = page;

        this.usernameInput =
            page.getByPlaceholder('Username');

        this.passwordInput =
            page.getByPlaceholder('Password');

        this.loginButton =
            page.getByRole('button', {
                name: 'Login'
            });

        this.errorMessage =
            page.locator('[data-test="error"]');
    }

    async navigateToLoginPage() {
        await this.page.goto('/');
    }

    async login(username, password) {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    async verifyLoginError(message) {

        await expect(this.errorMessage)
            .toContainText(message);
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}