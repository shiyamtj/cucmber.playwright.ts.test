import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { CustomWorld } from '../support/world'

Given('I am on the Saucedemo login page', async function (this: CustomWorld) {
  await this.page.goto('https://www.saucedemo.com/')
})

When(
  'I enter the username {string} and password {string}',
  async function (this: CustomWorld, username, password) {
    await this.page.fill('#user-name', username)
    await this.page.fill('#password', password)
  }
)

When('I click the login button', async function (this: CustomWorld) {
  await this.page.click('#login-button')
})

Then(
  'I should be redirected to the inventory page',
  async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    )
  }
)

Then(
  'I should see an error message {string}',
  async function (this: CustomWorld, errorMessage) {
    const locator = this.page.locator('[data-test="error"]')
    await expect(locator).toHaveText(errorMessage)
  }
)
