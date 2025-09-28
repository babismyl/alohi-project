import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { TEST_USERS, ERROR_MESSAGES } from './utils/test-data';

test.describe('Authentication Flow', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('invalidLogin', async () => {
        await loginPage.enterEmail(TEST_USERS.INVALID_USER.email);
        await loginPage.enterPassword(TEST_USERS.INVALID_USER.password);
        await loginPage.expectErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
    });

    test('validLogin', async ({ page }) => {
        await loginPage.enterEmail(TEST_USERS.VALID_USER.email);
        await loginPage.enterPassword(TEST_USERS.VALID_USER.password);
        await expect(page).toHaveURL(new RegExp('https://app.sign.plus/home\\?lng=en'));
    });

    test('maintainLoginAcrossApps', async ({ page }) => {
        await loginPage.login(TEST_USERS.VALID_USER.email, TEST_USERS.VALID_USER.password);
        await expect(page).toHaveURL(new RegExp('https://app.sign.plus/home\\?lng=en'));
        const newTabPromise = loginPage.waitForNewTab();
        await loginPage.navigateToFaxPlusFromAppSwitcher();
        const newTab = await newTabPromise;
        await expect(newTab).toHaveURL('https://app.fax.plus/faxes/inbox?lng=en');
    });

    test('signUpNavigationAndFormElements', async ({ page }) => {
        await loginPage.navigateToSignUp();
        await loginPage.verifySignUpFormElements();
        await loginPage.firstNameInput.fill('Test');
        await expect(loginPage.firstNameInput).toHaveValue('Test');
    });
});