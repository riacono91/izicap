import { test, expect } from '@playwright/test';

let title;

test.beforeEach(async ({ page }) => {
  title = (Math.random() + 1).toString(36).substring(7);
});

test('create a new article and publish', async ({ page }) => {

    /*the user is logged, and click on the navbar 'new article'
    check: the page is https://angular.realworld.io/editor
    check the editor page with the correct text boxes:
    - Article Title
    - What's this article about?
    - Write your article (in markdown) -> resizable
    - Enter tags

    check the editor page with the correct button:
    - Publish Article

    compile all fields
    click the button Publish Article

    check: the article is published and the user is redirected in the page of the article
    check: Article title is the same and in the place where is expected to be
    check: description is present, correct  and in the expected place
    check: body is present, correct and is in the expected  place
    check: tag is present, correct and in the expected place
    check: the user and the data are correct

    the user click in Home on the navbar
    check: under Your feed the new article is present
    check: under Global feed the new article is present*/

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
    await page.getByPlaceholder('Enter tags').click();
    await page.getByPlaceholder('Enter tags').fill('test_tag');    
    await page.getByPlaceholder('Enter tags').press('Enter');
    await page.getByPlaceholder('Enter tags').click();

    await page.getByRole('button', { name: 'Publish Article' }).click();

    await expect(page).toHaveURL(/article/);
    //check the article
    expect(page.getByRole('heading', { name: title })).toBeVisible();
    expect(page.getByText('the article is writtent from here')).toBeVisible();
    expect(page.getByText('tag')).toHaveText('test_tag');
    //check username
    expect(page.getByRole('navigation').getByRole('link', { name: 'ritaqq' })).toBeVisible();
    expect(page.getByRole('link', { name: 'ritaqq' }).nth(1)).toBeVisible();
    expect(page.getByRole('link', { name: 'ritaqq' }).nth(2)).toBeVisible();
    
    //check date
    let current_date = new Date();
    let date = current_date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'});
    expect(page.getByText(date).first()).toBeVisible();

    expect(page.getByRole('link', { name: ' Edit Article' }).first()).toBeVisible();
    expect(page.getByRole('button', { name: ' Delete Article' }).first()).toBeVisible();

    expect(page.getByRole('link', { name: ' Edit Article' }).nth(1)).toBeVisible();
    expect(page.getByRole('button', { name: ' Delete Article' }).nth(1)).toBeVisible();

    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForURL('https://angular.realworld.io');

    await page.getByText('Global Feed').click();
    await expect(page.getByText('ritaqq '+date+' 0 '+title+'Desription of the articleRead more... test_tag')).toBeVisible();
    
    await page.getByText('Your Feed').click();
    await expect(page.getByText('ritaqq '+date+' 0 '+title+'Desription of the articleRead more... test_tag')).toBeVisible();
    
});

test('create a new article without body', async ({ page }) => {
    /*the user is logged, and click on the navbar 'new article'
    check: the page is https://angular.realworld.io/editor
    check the editor page with the correct field set:
    - Article Title
    - What's this article about?
    - Write your article (in markdown)
    - Enter tags

    compile all fields without body
    check the error message is present:  body can't be blank*/

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
    //don't write the article
    await page.getByPlaceholder('Enter tags').click();
    await page.getByPlaceholder('Enter tags').fill('test_tag');    
    await page.getByPlaceholder('Enter tags').press('Enter');
    await page.getByPlaceholder('Enter tags').click();

    await page.getByRole('button', { name: 'Publish Article' }).click();
    await page.getByText('body can\'t be blank').click();

});