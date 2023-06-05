import { test, expect } from '@playwright/test';

let title;
let article_url;

test.beforeEach(async ({ page }) => {
  title = (Math.random() + 1).toString(36).substring(7);
    await page.goto('https://angular.realworld.io/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ri@gmail.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('ri');
    await page.getByPlaceholder('Password').press('Enter');
    await page.getByRole('link', { name: ' New Article' }).click();
    await page.getByPlaceholder('Article Title').click();
    await page.getByPlaceholder('Article Title').fill(title);
    await page.getByPlaceholder('Article Title').press('Tab');
    await page.getByPlaceholder('What\'s this article about?').fill('description');
    await page.getByPlaceholder('What\'s this article about?').press('Tab');
    await page.getByPlaceholder('Write your article (in markdown)').fill('nothing in particular');
    await page.getByPlaceholder('Enter tags').fill('tag');
    await page.getByPlaceholder('Enter tags').press('Enter');
    await page.getByPlaceholder('Enter tags').press('Tab');
    await page.getByRole('button', { name: 'Publish Article' }).click();
    await page.waitForURL('**/article/**', {waitUntil: 'domcontentloaded'});
    article_url = page.url();
    await expect(article_url).toContain('https://angular.realworld.io/article/' + title);
});

test('delete article - first button', async ({ page }) => {
  await page.getByRole('button', { name: ' Delete Article' }).first().click();
  await page.waitForURL('https://angular.realworld.io/');
  await page.goto(article_url); // just to have the screenshot in the trace
  const response = await page.request.get(article_url);
  expect(response.status()).toBe(404);
});

test('delete article - second button', async ({ page }) => {
  await page.getByRole('button', { name: ' Delete Article' }).nth(1).click();
  await page.waitForURL('https://angular.realworld.io/');
  await page.goto(article_url); // just to have the screenshot in the trace
  const response = await page.request.get(article_url);
  expect(response.status()).toBe(404);
});
