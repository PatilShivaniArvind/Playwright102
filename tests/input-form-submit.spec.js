
const { test, expect } = require('./test-fixtures');

test('Scenario 3 - Input Form Submit', async ({ page }) => {

  await page.goto('/selenium-playground/');

  await page.getByRole('link', {
    name: 'Input Form Submit'
  }).click();

  await expect(page).toHaveURL(/input-form-demo/);

  // Test mandatory field validation
  await page.getByRole('button', { name: 'Submit' }).click();

  const nameField = page.locator('#name');

  await expect(nameField).toBeFocused();

const validationMessage = await nameField.evaluate(element => element.validationMessage);
expect(validationMessage.toLowerCase()).toMatch(/please fill (in|out) this field/);

  // Fill all mandatory and other form fields
  await nameField.fill('TestMu Tester');
  await page.locator('#inputEmail4').fill('tester@example.com');
  await page.locator('#inputPassword4').fill('TestPassword123!');
  await page.locator('#company').fill('TestMu Automation');
  await page.locator('#websitename').fill('https://example.com');

  await page.locator('select[name="country"]')
    .selectOption({ label: 'United States' });

  await page.locator('#inputCity').fill('New York');
  await page.locator('#inputAddress1').fill('123 Test Street');
  await page.locator('#inputAddress2').fill('Suite 100');
  await page.locator('#inputState').fill('New York');
  await page.locator('#inputZip').fill('10001');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText(
    'Thanks for contacting us, we will get back to you shortly.',
    { exact: true }
  )).toBeVisible();

  await page.screenshot({
    path: 'screenshots/scenario3-form-submit.png',
    fullPage: true
  });

});
