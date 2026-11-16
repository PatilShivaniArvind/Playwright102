
const { test, expect } = require('@playwright/test');

test('Scenario 2 - Drag slider from 15 to 95', async ({ page }) => {

  await page.goto('https://www.testmuai.com/selenium-playground/');

  await page.getByRole('link', {
    name: 'Drag & Drop Sliders'
  }).click();

  await expect(page).toHaveURL(/drag-drop-range-sliders-demo/);

  // Select the third slider (default value 15)
  const slider = page.locator('input[type="range"]').nth(2);

  await expect(slider).toHaveValue('15');

  const box = await slider.boundingBox();

  // First physically drag the slider towards 95
  const targetX = box.x + box.width * 0.94;
  const centerY = box.y + box.height / 2;

  await page.mouse.move(box.x + box.width * 0.15, centerY);
  await page.mouse.down();

  await page.mouse.move(targetX, centerY, { steps: 100 });

  await page.mouse.up();

  // Fine-tune using keyboard until the exact value is 95
  await slider.focus();

  let currentValue = Number(await slider.inputValue());

  while (currentValue > 95) {
    await slider.press('ArrowLeft');
    currentValue = Number(await slider.inputValue());
  }

  while (currentValue < 95) {
    await slider.press('ArrowRight');
    currentValue = Number(await slider.inputValue());
  }

  // Validate the final slider value
  await expect(slider).toHaveValue('95');

  // Capture screenshot
  await page.screenshot({
    path: 'screenshots/scenario2-slider.png',
    fullPage: true
  });

});
