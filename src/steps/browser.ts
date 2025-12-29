import { Page, chromium, firefox, webkit, Browser, BrowserContext } from '@playwright/test';
import fs from 'fs-extra';
import path from 'path';

export let page: Page;
export let browser: Browser;
export let context: BrowserContext;

const viewports = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

export const startBrowser = async () => {
  const browserType = process.env.BROWSER || 'chromium';
  const headless = process.env.HEADLESS === 'true';
  const viewportName = (process.env.VIEWPORT || 'desktop') as keyof typeof viewports;
  const viewport = viewports[viewportName];

  switch (browserType.toLowerCase()) {
    case 'firefox':
      browser = await firefox.launch({ headless });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless });
      break;
    default:
      browser = await chromium.launch({ headless });
      break;
  }
  
  const version = browser.version();
  const reportDir = path.join(__dirname, '..', '..', 'reports');
  fs.ensureDirSync(reportDir);
  fs.writeFileSync(path.join(reportDir, `${browserType.toLowerCase()}.version`), version);
  
  context = await browser.newContext({ viewport });
  page = await context.newPage();
};

export const closeBrowser = async () => {
  await page.close();
  await browser.close();
};
