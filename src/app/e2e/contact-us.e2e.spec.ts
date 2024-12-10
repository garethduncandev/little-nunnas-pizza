import { expect, test } from '@playwright/test';

test('contact us form validation', async ({ page }) => {
  await page.goto('/');

  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Contact us' }).click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Gareth');
  await page.getByLabel('Email*').click();
  await page.getByLabel('Email*').fill('gareth.duncan@fft.org.uk');
  await page.locator('#phone').click();
  await page.locator('#phone').fill('123456789');
  await page.getByLabel('Date*').fill('2024-12-25');
  await page.locator('#number-of-pizzas').fill('30');
  await page.getByLabel('Message*').click();
  await page.getByLabel('Message*').fill('Test message');
});
