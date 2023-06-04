import { test, expect } from '@playwright/test';

test('login correct', async ({ page }) => {

    /*Description test case
    the user is on the home page https://angular.realworld.io
    the user click on Sign In

    check: the page is https://angular.realworld.io/login
    check the editor page with the correct text boxes:
    - Email
    - Password

    check the editor page with the correct button:
    - Sign in

    user enters credentials - email, password
    user clicks on green Sign in
    check : user is redirect to the 'your feed' section
    check: the navigation bar with item: Home
    check: the navigation bar with item: New article
    check: the navigation bar with item: Settings
    check: the navigation bar with profile section that contain an avatar and the username*/
  
    await page.goto('https://angular.realworld.io/');
  
    //the user click on Sign in
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io/login');
    
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ri@gmail.com');
  
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('ri');
    
    //click in another field (like email) to allow the Sign in button not to be disabled
    await page.getByPlaceholder('Email').click();
  
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io');

    await expect(page.getByText('Your Feed')).toBeVisible();

    const navigationBar = page.getByRole('navigation');

    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' New Article' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Settings' })).toBeVisible();
    
    await navigationBar.locator('user-pic').isVisible();
    await expect(page.getByRole('link', { name: 'ritaqq' })).toBeVisible();

});

test('login correct and global feed', async ({ page }) => {
    /*
    the user is on the home page https://angular.realworld.io
    the user click on Sign In
    check: the page is https://angular.realworld.io/login

    user enters credentials - email, password
    user clicks on green Sign in
    User click on  Global Feed link
    check: the view of the article list*/

    await page.goto('https://angular.realworld.io/');

    //the user click on Sign in
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io/login');

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ri@gmail.com');

    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('ri');

    //click in another field (like email) to allow the Sign in button not to be disabled
    await page.getByPlaceholder('Email').click();

    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io');

    await expect(page.getByText('Global Feed')).toBeVisible();
    //global feed aticles list
    const articles_list = '//html/body/app-root/app-home-page/div/div/div/div[1]/app-article-list';
    await expect(page.locator(articles_list)).toBeVisible();
});

test('sign in - logout - sign in', async ({ page }) => {
    /*
    the user is on the home page https://angular.realworld.io
    the user click on Sign In
    check: the page is https://angular.realworld.io/login

    user enters credentials - email, password
    user clicks on green Sign in
    check: the user is logged
    click on setting
    click on 'or click here to logout'
    check: the user is redirect to the home page https://angular.realworld.io/
    click on your feed
    user is redirect to the sign in page
    user enters credentials - email, password
    user clicks in green Sign in*/

    await page.goto('https://angular.realworld.io/');

    //the user click on Sign in
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io/login');

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ri@gmail.com');

    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('ri');

    //click in another field (like email) to allow the Sign in button not to be disabled
    await page.getByPlaceholder('Email').click();

    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io');

    await expect(page.getByRole('link', { name: 'ritaqq' })).toBeVisible();
    await page.getByRole('link', { name: ' Settings' }).click();    
    await expect(page).toHaveURL('https://angular.realworld.io/settings');

    await page.getByRole('button', { name: 'Or click here to logout.' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io');

    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('https://angular.realworld.io/login');

    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('ri@gmail.com');
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill('ri');
    await page.getByPlaceholder('Password').press('Enter');
    await page.getByText('Your Feed').isVisible();

    await expect(page).toHaveURL('https://angular.realworld.io');
});