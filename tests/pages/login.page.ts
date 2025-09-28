import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly errorMessage: Locator;
    readonly appSwitcher: Locator;
    readonly faxPlusButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.locator('#kc-login')
        this.errorMessage = page.getByText('Invalid email or password. Please try again.');
        this.appSwitcher = page.locator('#app-switcher')
        this.faxPlusButton = page.getByText('Fax.Plus');
    }

    async goto() {
        await this.page.goto('https://app.sign.plus/login?lng=en');
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
        await this.signInButton.click();
    }

    async enterPassword(password: string) {
        await this.passwordInput.waitFor({ state: 'visible' });
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async expectErrorMessage(message: string) {
        await expect(this.errorMessage).toContainText(message);
    }

    async waitForNewTab() {
        const pagePromise = this.page.context().waitForEvent('page');
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }

    async navigateToFaxPlusFromAppSwitcher() {
        await this.appSwitcher.click();
        await this.faxPlusButton.click();
    }
}