import { test, expect } from '@playwright/test';

let title;

test.beforeEach(async ({ page }) => {
  title = (Math.random() + 1).toString(36).substring(7);
});

test('comment article created by the user', async ({ page }) => {
/* the user is logged
the user write a new article
check: the user is redirect to the page of the article
the user write a comment in the section card block and click on 'Post comment'
check: the comment is added under the article */

    // log in
    await page.goto('https://angular.realworld.io/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ri@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('ri');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // writing new article
    await page.getByRole('link', { name: ' New Article' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io/editor');

    await page.getByPlaceholder('Article Title').click();
    await page.getByPlaceholder('Article Title').fill(title);
    await page.getByPlaceholder('What\'s this article about?').click();
    await page.getByPlaceholder('What\'s this article about?').fill('Desription of the article');
    await page.getByPlaceholder('Write your article (in markdown)').click();
    await page.getByPlaceholder('Write your article (in markdown)').fill('the article is writtent from here');

    await page.getByRole('button', { name: 'Publish Article' }).click();

    await expect(page).toHaveURL(/article/);

    let comment_text = 'Some comment to add';
    let current_date = new Date();
    let date = current_date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});
    await page.getByPlaceholder('Write a comment...').click();
    await page.getByPlaceholder('Write a comment...').fill(comment_text);
    await page.getByRole('button', { name: 'Post Comment' }).click();
    await expect(page.getByText(comment_text)).toBeVisible();
    await expect(page.locator('app-article-comment').getByText(date)).toBeVisible();
    await expect(page.locator('app-article-comment i')).toBeVisible();
});

test('comment article created by others', async ({ page }) => {
/* the user is logged and click in Global feed
check the article list
click in one article
check: the user is redirect to the page of the article
the user write a comment in the section card block and click on 'Post comment'
check: the comment is added under the article */
    // log in
    await page.goto('https://angular.realworld.io/');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('commenter');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('commenter');
    await page.getByRole('button', {name: 'Sign in'}).click();

    await page.getByText('Global Feed').click();

    await page.getByRole('link', {name: 'If we quantify the alarm'}).click();

    await expect(page).toHaveURL(/article/);

    let comment_text = 'Some comment to add';
    let current_date = new Date();
    let date = current_date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});
    await page.getByPlaceholder('Write a comment...').click();
    await page.getByPlaceholder('Write a comment...').fill(comment_text);
    await page.getByRole('button', { name: 'Post Comment' }).click();
    await expect(page.getByText(comment_text)).toBeVisible();
    await expect(page.locator('app-article-comment').getByText(date)).toBeVisible();
    await expect(page.locator('app-article-comment i')).toBeVisible();
});