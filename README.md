# Cucumber, Playwright, and TypeScript Test Project

This project demonstrates how to set up and run automated tests using Cucumber.js, Playwright, and TypeScript. The tests are written for the [Saucedemo](https://www.saucedemo.com/) website.

## Setup

1.  **Install dependencies:**
    This project uses [Yarn](https://yarnpkg.com/) as the package manager. To install the project dependencies, run the following command in your terminal:
    ```bash
    yarn install
    ```

2.  **Install Playwright browsers:**
    After installing the dependencies, you need to install the browsers for Playwright.
    ```bash
    npx playwright install
    ```

## Running the Tests

To run the tests, you can use the following commands.

### Running in a specific browser

You can run the tests in a specific browser using the following scripts:

*   **For Chromium (the default):**
    ```bash
    yarn test:chromium
    ```
    or simply
    ```bash
    yarn test
    ```

*   **For Firefox:**
    ```bash
    yarn test:firefox
    ```

*   **For WebKit (Safari's engine):**
    ```bash
    yarn test:webkit
    ```

By default, tests will run in headed mode (a browser window will open).

### Running in Headless Mode

To run the tests in headless mode (without a browser window), set the `HEADLESS` environment variable to `true`.

```bash
HEADLESS=true yarn test:firefox
```

## Building the Project

To compile the TypeScript files, run:

```bash
yarn build
```

This will compile the files from the `src` directory and output them to the `dist` directory, as specified in the `tsconfig.json` file.

## Project Structure

*   `cucumber.js`: Configuration file for Cucumber.js.
*   `package.json`: Defines the project dependencies and scripts.
*   `tsconfig.json`: Configuration file for the TypeScript compiler.
*   `src/features/`: Contains the `.feature` files with the Gherkin scenarios.
*   `src/steps/`: Contains the TypeScript files with the step definitions that implement the Gherkin scenarios.
*   `src/steps/world.ts`: Defines the custom world for Cucumber, which manages the browser and page instances.
