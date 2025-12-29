import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from './browser';

Given('I am on the Saucedemo login page', async function () {
  await page.goto('https://www.saucedemo.com/');
});

When('I enter the username {string} and password {string}', async function (username, password) {
  await page.fill('#user-name', username);
  await page.fill('#password', password);
});

When('I click the login button', async function () {
  await page.click('#login-button');
});

Then('I should be redirected to the inventory page', async function () {
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

Then('I should see an error message {string}', async function (errorMessage) {
  const locator = page.locator('[data-test="error"]');
  await expect(locator).toHaveText(errorMessage);
});
