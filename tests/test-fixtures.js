
const base = require('@playwright/test');
const { chromium } = require('playwright');

exports.test = base.test.extend({
  page: async ({}, use, testInfo) => {
    let browser;

    if (process.env.TEST_ENV === 'hyperexecute') {
      const capabilities = {
        browserName: 'Chrome',
        browserVersion: 'latest',
        'LT:Options': {
          platform: process.env.HE_ENV_os === 'linux'
           ? 'MacOS Sonoma'
           : 'Windows 10',
          build: 'Playwright Certification',
          name: testInfo.title,
          user: process.env.LT_USERNAME,
          accessKey: process.env.LT_ACCESS_KEY,
          network: true,
          video: true,
          console: true,
          tunnel: false
        }
      };

      browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
      });
    } else {
      browser = await chromium.launch({ headless: true });
    }

    const context = await browser.newContext({
      baseURL: testInfo.project.use.baseURL
    });

    const page = await context.newPage();

    try {
      await use(page);
    } finally {
      if (process.env.TEST_ENV === 'hyperexecute') {
        const status = {
          action: 'setTestStatus',
          arguments: {
            status: testInfo.status === 'passed' ? 'passed' : 'failed',
            remark: testInfo.error?.message || 'Test completed'
          }
        };

        await page.evaluate(
          () => {},
          `lambdatest_action: ${JSON.stringify(status)}`
        );
      }

      await context.close();
      await browser.close();
    }
  }
});

exports.expect = base.expect;
