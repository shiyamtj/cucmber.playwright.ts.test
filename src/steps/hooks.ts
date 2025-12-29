import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  ITestCaseHookParameter,
  setDefaultTimeout,
} from '@cucumber/cucumber'
import path from 'path'
import { CustomWorld } from './world'

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

setDefaultTimeout(120000) // Increase timeout to handle long-running operations

BeforeAll(async () => {
  console.log('Starting all tests...')
})

AfterAll(async () => {
  console.log('All tests completed.')
})

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  try {
    await this.launchBrowser()

    if (process.env.TRACE_ENABLED === 'true') {
      await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true,
      })
    }
  } catch (error) {
    console.error('Error in Before hook:', error)
    throw error
  }
})

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  try {
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
      await this.context.tracing.stop({ path: tracePath })
    }

    const screenshot = await this.page.screenshot()
    this.attach(screenshot, 'image/png')
  } catch (error) {
    console.error('Error in After hook:', error)
  } finally {
    await this.closeBrowser()
  }
})
