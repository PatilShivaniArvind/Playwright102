
const { test, expect } = require('./test-fixtures');

test('Scenario 1 - Simple Form Demo', async ({ page }) => {

  const message = 'Welcome to TestMu AI';

  await page.goto('/selenium-playground/');

  await page.getByRole('link', {name: 'Simple Form Demo'}).click();

  await expect(page).toHaveURL(/simple-form-demo/);

  await page.waitForLoadState('networkidle');

  await page.locator('input#user-message').fill(message);

  await page.locator('#showInput').click();

  await expect(page.locator('#message')).toHaveText(message);

  await page.screenshot({path: 'screenshots/scenario1-simple-form.png',fullPage: true});

});
