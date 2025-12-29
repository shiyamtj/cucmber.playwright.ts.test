import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  ITestCaseHookParameter,
} from '@cucumber/cucumber'
import { page, context } from './browser'
import { startBrowser, closeBrowser } from './browser'
import path from 'path'

function getUniqueTraceName(
  scenarioName: string,
  browserType: string,
  viewportName: string
): string {
  const sanitizedName = scenarioName
    .replace(/[^a-zA-Z0-9_ -]/g, '')
    .replace(/\s/g, '_')

  return `${sanitizedName}_${browserType}_${viewportName}`
}

BeforeAll(async () => {
  await startBrowser()
})

AfterAll(async () => {
  await closeBrowser()
})

Before(async function (this: any, scenario: ITestCaseHookParameter) {
  if (process.env.TRACE_ENABLED === 'true') {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true,
    })
  }
})

After(async function (this: any, scenario: ITestCaseHookParameter) {
  if (process.env.TRACE_ENABLED === 'true') {
    const browserType: string = process.env.BROWSER || 'chromium'
    const viewportName: string = process.env.VIEWPORT || 'desktop'
    const traceName = getUniqueTraceName(
      scenario.pickle.name,
      browserType,
      viewportName
    )
    const tracePath = path.join(
      __dirname,
      '..',
      '..',
      'reports',
      'traces',
      `${traceName}.zip`
    )
    await context.tracing.stop({ path: tracePath })
  }

  const screenshot = await page.screenshot()
  return this.attach(screenshot, 'image/png')
})
