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

### Individual Browser/Viewport Tests

These commands run tests in a specific browser or for a specific viewport.

*   **For Chromium (default browser):**
    ```bash
    yarn test:chromium
    ```
    Runs tests in Chromium.

*   **For Firefox:**
    ```bash
    yarn test:firefox
    ```
    Runs tests in Firefox.

*   **For WebKit (Safari's engine):**
    ```bash
    yarn test:webkit
    ```
    Runs tests in WebKit.

*   **For Desktop Viewport (default viewport):**
    ```bash
    yarn test:desktop
    ```
    Runs tests for a desktop viewport in Chromium.

*   **For Tablet Viewport:**
    ```bash
    yarn test:tablet
    ```
    Runs tests for a tablet viewport in Chromium.

*   **For Mobile Viewport:**
    ```bash
    yarn test:mobile
    ```
    Runs tests for a mobile viewport in Chromium.

### Running in Headless Mode

To run tests in headless mode (without a browser UI), set the `HEADLESS` environment variable to `true` before the command.

```bash
HEADLESS=true yarn test:chromium
```

### Parallel and Full Test Suite Runs

*   **Run all browser tests in parallel:**
    ```bash
    yarn test:parallel
    ```
    Executes `test:chromium`, `test:firefox`, and `test:webkit` concurrently.

*   **Full test suite (pretest, parallel, metadata, report generation):**
    ```bash
    yarn test
    ```
    This is the main command to run the entire test process, which includes:
    1.  `npm run pretest`: Cleans previous reports.
    2.  `npm run test:parallel`: Runs tests across all configured browsers.
    3.  `npm run add-metadata`: Adds additional metadata to test results.
    4.  `npm run report`: Generates the HTML test report.

### Other Test-Related Commands

*   **Clean Reports:**
    ```bash
    yarn clean:reports
    ```
    Removes the `reports` directory.

*   **Add Metadata to Reports:**
    ```bash
    yarn add-metadata
    ```
    Executes the script to add metadata to the generated JSON reports.

*   **Generate HTML Report:**
    ```bash
    yarn report
    ```
    Generates a human-readable HTML report from the JSON test results.


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
