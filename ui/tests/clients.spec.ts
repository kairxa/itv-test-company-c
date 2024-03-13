import { test, expect } from '@playwright/test';

test('initially shows empty table', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByTestId('table-empty')).toHaveText(
		'No clients found. Please refine your keyword in the search bar above.'
	);
});

test('search clients by name', async ({ page }) => {
	await page.goto('/');

	await page.fill('#table-client-input-search', 'John');
	await page.click('button[type="submit"]');

	await expect(page.getByTestId('table-clients-row-name').nth(0)).toHaveText('Alice Johnson');
	await expect(page.getByTestId('table-clients-row-name').nth(1)).toHaveText('John Smitherin');
});

test('search clients by email', async ({ page }) => {
	await page.goto('/');

	await page.fill('#table-client-input-search', 'john@gmail.com');
	await page.click('button[type="submit"]');

	await expect(page.getByTestId('table-clients-row-name').nth(0)).toHaveText('John Smitherin');
});

test('search clients by phone number', async ({ page }) => {
	await page.goto('/');

	await page.fill('#table-client-input-search', '99112');
	await page.click('button[type="submit"]');

	await expect(page.getByTestId('table-clients-row-name').nth(0)).toHaveText('Ivy Taylor');
	await expect(page.getByTestId('table-clients-row-phone-number').nth(0)).toHaveText('+61 920 991 12');
});

test('search keyword "a" and change page', async ({ page }) => {
	await page.goto('/');

	await page.fill('#table-client-input-search', 'a');
	await page.click('button[type="submit"]');
	await page.click('button[aria-label="Go to next page"]');

	await expect(page.getByTestId('table-clients-row-name').nth(0)).toHaveText('Frank Miller');
});

test('change rows per page and search keyword "a"', async ({ page }) => {
	await page.goto('/');

	await page.fill('#table-client-input-search', 'a');
	await page.click('div[data-testid="table-client-select-rows-per-page"] > div');
	await page.click('li[data-value="10"]');
	await page.click('button[type="submit"]');

	await expect(page.getByTestId('table-clients-row-name')).toHaveCount(9);
});

test('change to ID language', async ({ page }) => {
	await page.goto('/');

	await page.click('button[aria-label="Ubah ke Bahasa Indonesia"]');

	await expect(page.getByTestId('table-clients-title')).toHaveText('Klien');
});

test('create new client', async ({ page }) => {
	await page.goto('/');

	// Opening dialog
	await page.click('button[aria-label="Create new client"]');

	// Asserting continue button is still disabled
	await expect(page.locator('button[aria-label="Continue"]')).toHaveAttribute('disabled');

	// Asserting that filling last name does not change continue button state
	await page.fill('#client-create-input-last-name', 'Doe');
	await expect(page.locator('button[aria-label="Continue"]')).toHaveAttribute('disabled');

	// Asserting that filling first name enables continue button
	await page.fill('#client-create-input-first-name', 'John');
	await expect(page.locator('button[aria-label="Continue"]')).not.toHaveAttribute('disabled');

	// Clicking continue button
	// Asserting that create client button is disabled
	await page.click('button[aria-label="Continue"]');
	await expect(page.locator('button[aria-label="Create client"]')).toHaveAttribute('disabled');

	// Asserting that there is no error message while input is not yet touched
	await expect(page.locator('#client-create-input-email-helper-text')).not.toBeVisible();
	await expect(page.locator('#client-create-input-phone-number-helper-text')).not.toBeVisible();

	// Asserting that filling invalid email shows error message
	await page.fill('#client-create-input-email', 'john.doe');
	await expect(page.locator('#client-create-input-email-helper-text')).toHaveText('Invalid email');

	// Asserting that filling valid email hides error message
	await page.fill('#client-create-input-email', 'john.doe@gmail.com');
	await expect(page.locator('#client-create-input-email-helper-text')).not.toBeVisible();

	// Asserting that filling valid email enables Create client button
	await expect(page.locator('button[aria-label="Create client"]')).not.toHaveAttribute('disabled');

	// Asserting that deleting email disables Create client button and shows error message
	await page.fill('#client-create-input-email', '');
	await expect(page.locator('button[aria-label="Create client"]')).toHaveAttribute('disabled');
	await expect(page.locator('#client-create-input-email-helper-text')).toHaveText('Invalid email');

	// Asserting that filling invalid phone number shows error message
	await page.fill('#client-create-input-phone-number', '123');
	await expect(page.locator('#client-create-input-phone-number-helper-text')).toHaveText('Invalid phone number');

	// Asserting that filling valid phone number hides error message
	await page.fill('#client-create-input-phone-number', '123456789');
	await expect(page.locator('#client-create-input-phone-number-helper-text')).not.toBeVisible();

	// Asserting that filling valid phone number enables Create client button
	await expect(page.locator('button[aria-label="Create client"]')).not.toHaveAttribute('disabled');

	// Creating client should show success message
	await page.click('button[aria-label="Create client"]');
	await expect(page.locator('div[data-testid="alert"]')).toHaveText('Client created successfully');
});
