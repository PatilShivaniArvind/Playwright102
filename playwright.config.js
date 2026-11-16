const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  fullyParallel: true,

  workers: 3,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  use: {
    baseURL: 'https://www.testmuai.com',
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on'
  },

  projects: [
    {
  name: 'Chrome',
  use: {
    browserName: 'chromium',
    channel: 'chrome'
  }
}
  ]
});