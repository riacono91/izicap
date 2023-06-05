import { test, expect } from '@playwright/test';
let name;
let email; 
let password; 

test.beforeEach(async ({ page }) => {
  name = (Math.random() + 1).toString(36).substring(7);
  email = (Math.random() + 1).toString(36).substring(7);
  password = (Math.random() + 1).toString(36).substring(7);
});

test('new account creation', async ({ page }) => {

  /*Description test case
  the user is on the home page https://angular.realworld.io
  the user click on Sign Up
  check: the page is https://angular.realworld.io/register
  check the editor page with the correct text boxes:
  - Username
  - Email
  - Password

  check the editor page with the correct button:
  - Sign up

  user enters credentials - username, email, password
  user clicks Sign up
  check : user is redirect to the 'your feed' section*/

  await page.goto('https://angular.realworld.io/');

  //the user click on Sign up
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('https://angular.realworld.io/register');
  
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill(name);
  
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);

  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);
  
  //click in another field (like email) to allow the Sign up button not to be disabled
  await page.getByPlaceholder('Email').click();

  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.waitForURL('https://angular.realworld.io');
});

test('new user creation - need an account', async ({ page }) => {

  /*Description test case
  the user is on the home page https://angular.realworld.io
  User click on Sign in (https://angular.realworld.io/login)
  User click on 'need an account' 
  check: user lands on register page (https://angular.realworld.io/register)
  user enters credentials - username, email, password
  user clicks Sign up
  check : user is redirect to the 'your feed' section*/

  await page.goto('https://angular.realworld.io/');

  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('https://angular.realworld.io/login');  

  //the user click on Sign up
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('https://angular.realworld.io/register');
  
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill(name);
  
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);

  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);
  
  //click in another field (like email) to allow the Sign up button not to be disabled
  await page.getByPlaceholder('Email').click();

  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.waitForURL('https://angular.realworld.io');

});

test('new user creation - partial credential', async ({ page }) => {
  
  /*Description test case
  the user is on the home page https://angular.realworld.io
  the user click on Sign Up
  check: the page is https://angular.realworld.io/register

  user enters credentials - username, email
  user clicks Sign up
  check : 'sign up' button is not clickable*/

  await page.goto('https://angular.realworld.io/');

  //the user click on Sign up
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('https://angular.realworld.io/register');
  
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill(name);
  
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);

  await expect(page.getByRole('button', { name: 'Sign up' })).toBeDisabled();

});

test('new user - username already exist', async ({ page }) => {

  /*  Description test case
  the user is on the home page https://angular.realworld.io
  the user click on Sign Up
  check: the page is https://angular.realworld.io/register

  user enters credentials with a username that already exist
  user clicks Sign up
  check : error message -> username has already been taken*/

  await page.goto('https://angular.realworld.io/');

  //the user click on Sign up
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('https://angular.realworld.io/register');
  
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('user');
  
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);

  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);
  
  //click in another field (like email) to allow the Sign up button not to be disabled
  await page.getByPlaceholder('Email').click();

  await page.getByRole('button', { name: 'Sign up' }).click();
  
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByText('username has already been taken').click();

  await page.waitForURL('https://angular.realworld.io/register');
});

test('new user - without username', async ({ page }) => {

  /*Description test case
  the user is on the home page https://angular.realworld.io
  the user click on Sign Up
  check: the page is https://angular.realworld.io/register

  user enters credentials without username
  user clicks create/Sign up
  check : error message ->  username can't be blank*/

  await page.goto('https://angular.realworld.io/');

  //the user click on Sign up
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('https://angular.realworld.io/register');
    
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);

  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(password);
  
  //click in another field (like email) to allow the Sign up button not to be disabled
  await page.getByPlaceholder('Email').click();
  
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByText('username can\'t be blank').click();

  await page.waitForURL('https://angular.realworld.io/register');
});