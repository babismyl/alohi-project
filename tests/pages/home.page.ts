import { type Page, type Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('link', { name: 'Log in' });
    }

    async goto() {
        await this.page.goto('https://www.sign.plus/');
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}