import { test, expect } from '@playwright/test';

let title;
let title_mod;
let article_url;

test.beforeEach(async ({ page }) => {
  title = (Math.random() + 1).toString(36).substring(7);
  
  title_mod = (Math.random() + 1).toString(36).substring(7);
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

    await expect(page).toHaveURL(/article/);
    // await page.waitForURL('**/article/**', {waitUntil: 'domcontentloaded'});
    // article_url = page.url();
    // console.log('url: ', article_url);
    // await expect(article_url).toContain('https://angular.realworld.io/article/' + title);
});

test('modify article created by the user with the first button ', async ({ page }) => {
    /*the user is logged and click in Your feed

    check the article list is present
    click in one article previously created by the user

    check: the user is redirect to the page of the article
    check: two buttons 'Edit Article' are presents

    click on the first button Edit Article

    the user is in the section for the new Article
    check: the user lands on the new article page
    each test box contains the relative information of the article under editing

    the user modifies all fields
    the user clicks on the button Publish Article

    check: the article is successfully published with the correct changes and the user is redirected to the page of the article
    check: Article title is modified and in the place where is expected to be
    check: description is present, modified  and in the expected place
    check: body is present, modified and is in the expected  place
    check: tag is present, modified and in the expected place
    check: the user and the data are correct

    the user click in Home on the navbar
    check: under Your feed the new article is present and modified
    check: under Global feed the new article is present and modified
    */
    await page.goto('https://angular.realworld.io/');
    await page.getByText('Your Feed').click();
    expect(page.getByRole('heading', { name: title })).toBeVisible();
    // expect(page.getByRole('link', { name: title + ' description Read more...' })).toBeVisible();

    //I check in the Global feed considering that I check manually and there are no article in your feed, 
    //I will work inthe test with Global feed
    await page.getByText('Global Feed').click();
    await page.getByRole('link', { name: title + ' description Read more...' }).click();
    await page.getByRole('link', { name: ' Edit Article' }).first().click();

    await page.getByPlaceholder('Article Title').click();
    await page.getByPlaceholder('Article Title').fill(title_mod);
    await page.getByPlaceholder('What\'s this article about?').click();
    await page.getByPlaceholder('What\'s this article about?').fill('about modified');
    await page.getByPlaceholder('Write your article (in markdown)').click();
    await page.getByPlaceholder('Write your article (in markdown)').fill('article modified');
    await page.getByPlaceholder('Enter tags').click();
    await page.getByPlaceholder('Enter tags').fill('tag_modified');
    await page.getByPlaceholder('Enter tags').press('Enter');
    await page.getByRole('button', { name: 'Publish Article' }).click();

    await expect(page).toHaveURL(/article/);
    expect(page.getByRole('heading', { name: title_mod })).toBeVisible();
    // expect(page.getByText('article')).toHaveText('the article is writtent from here');
    expect(page.getByText('article modified')).toBeVisible();
    expect(page.getByText('tag_modified')).toHaveText('tag_modified');
    
    expect(page.getByRole('navigation').getByRole('link', { name: 'ritaqq' })).toBeVisible();
    expect(page.getByRole('link', { name: 'ritaqq' }).nth(1)).toBeVisible();
    expect(page.getByRole('link', { name: 'ritaqq' }).nth(2)).toBeVisible();

    expect(page.getByText('June 5, 2023').first()).toBeVisible();

    expect(page.getByRole('link', { name: ' Edit Article' }).first()).toBeVisible();
    expect(page.getByRole('button', { name: ' Delete Article' }).first()).toBeVisible();

    expect(page.getByRole('link', { name: ' Edit Article' }).nth(1)).toBeVisible();
    expect(page.getByRole('button', { name: ' Delete Article' }).nth(1)).toBeVisible();

    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForURL('https://angular.realworld.io');

    await page.getByText('Global Feed').click();
    await expect(page.getByRole('heading', { name: title_mod })).toBeVisible();
    // await expect(page.getByRole('link', { name: title_mod +' description Read more...' })).toBeVisible();

    await page.getByText('Your Feed').click();
    expect(page.getByRole('heading', { name: title_mod })).toBeVisible();
    // await expect(page.getByRole('link', { name: title_mod + ' description Read more...' })).toBeVisible();
});