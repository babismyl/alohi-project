import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly errorMessage: Locator;
    readonly appSwitcher: Locator;
    readonly faxPlusButton: Locator;
    readonly signUpButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly registrationEmailInput: Locator;
    readonly registrationPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly backButton: Locator;
    readonly googleLoginButton: Locator;
    readonly microsoftLoginButton: Locator;
    readonly microsoftSignInText: Locator;
    readonly appleLoginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.locator('#kc-login');
        this.errorMessage = page.getByText('Invalid email or password. Please try again.');
        this.appSwitcher = page.locator('#app-switcher');
        this.faxPlusButton = page.getByText('Fax.Plus');
        this.googleLoginButton = page.locator('#social-google');
        this.microsoftLoginButton = page.locator('#social-microsoft');
        this.microsoftSignInText = page.getByText('Sign in');
        this.appleLoginButton = page.locator('#social-apple');
        this.signUpButton = page.getByText('Sign Up For Free');
        this.firstNameInput = page.getByLabel('First name');
        this.lastNameInput = page.getByLabel('Last name');
        this.registrationEmailInput = page.getByLabel('Email');
        this.registrationPasswordInput = page.locator('#password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.backButton = page.getByText('Back');
    }

    async goto() {
        await this.page.goto('https://app.sign.plus/login?lng=en');
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
        await this.signInButton.click();
    }

    async enterPassword(password: string) {
        await this.backButton.waitFor({ state: 'visible' });
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

    async navigateToSignUp() {
        await this.signUpButton.click();
    }

    async verifySignUpFormElements() {
        await this.firstNameInput.waitFor({ state: 'visible' });
        await this.lastNameInput.waitFor({ state: 'visible' });
        await this.registrationEmailInput.waitFor({ state: 'visible' });
        await this.registrationPasswordInput.waitFor({ state: 'visible' });
        await this.registerButton.waitFor({ state: 'visible' });
        await this.backButton.waitFor({ state: 'visible' });
    }

    async verifyMicrosoftSignInPage() {
        await this.microsoftSignInText.waitFor({ state: 'visible' });
    }
}