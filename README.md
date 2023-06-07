# How it is structured the folder

Folder **E2E tests** that contain:
- files .ts which are E2E tests **scripts** identified by the name of the flow (playwright files) 
- folder for the **Reports**, one for each flow, where you can open and see the html file that contain the status of the tests. 

The file **testPlanIaconoRita.html** for the Test plan


# The Test plan
The Test plan is created with FreeMind, which uses files in the .mm extension (you can only open it if you have FreeMind installed). To be easier I exported it as a clickable html file. Once you open this file, you can navigate and interact with the mind map. If you click on a test case, you will be redirected to the description of that case, with the steps and the checks to be performed during the validation.
I created six sections for the E2E tests, one for each flow.
I identified some test cases with **priority 1**, and these are the tests which I implemented for the automated scripts.

For the cases I assume that:
- There is no specific password format
- At signup there is no email sent
- The article created is expected to be added in Your Feed and in Global Feed
- The tag is added only if you click ENTER when you fill the corresponding field

Considering that I don't have detailed specifications I noticed ambiguities in the site that I would like to emphasize, but I didn't conisder as bug in the tests
- Missing constrain for the email. For me should exist the check to register only email with the right format
- All the textboxes don't handle a good formatting of the very long strings. If you try to insert a very long string, when the element is visualized, the page layout results to be broken

# Analysis of the reports

## Creation New Account
100 % tests are passing

## Login
100% tests are passing

## Create New Article
**create a new article and publish** 
- with Chrome, it is failing the check where I expect to have the article published under 'Your Feed'
- with Firefox, is failing the check of the successful publication

**create a new article without body**
- with Chrome, 100% is passing
- with Firefox, is failing the check of the successful publication

## Edit Existing Article
**modify article created by others**
- 100% is passing

**modify article created by the user with the first button** 
- with Chrome, it is failing the check where I expect that the article under 'Your Feed' is modified
- with Firefox, is failing the check of the successful publication

## Adding Comment To An Existing Article
**comment article created by others**
- with Chrome, is failing the check of the comment because are published a few duplication of the same comment
- with Firefox, is failing the check of the comment because it is not published the comment

**comment article created by the user**
- with Chrome, 100% is passing
- with Firefox, is failing the check of the successful publication

## Deletion An Existing Article
**delete article created by the user with the first button**
- with Chrome, 100% is passing
- with Firefox, is failing the check of the successful publication

**delete article created by the user with the second button**
- with Chrome, 100% is passing
- with Firefox, is failing the check of the successful publication

# Installation guide

To use Playwright you need to install Windows Subsystem Linux and node js inside the WSL partition.

## Useful links:
- nvm: https://github.com/nvm-sh/nvm
- npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- playwright: https://playwright.dev/docs/intro

## Installation steps:
- Install wsl running from pwoer shell
```
wsl --install
```
- Run wsl 
- Inside the wsl partition, install nvm (node js version manager) running
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
- Install node js
```
nvm install node
```
- Install playwright
```
npm init playwright@latest
```
- Once you have playwright installed you can try to run the default tests and check that the installation went good
```
npx playwright test		# to run the tests
npx playwright show-report		# to show the reports
```
In order to run my test you can copy my automated scripts (like: Creation_of_a_new_account.spec.ts from E2E test folder) inside your folder tests.

After you can execute the command (with the name of the test to execute)
```
npx playwright test tests/Creation_of_a_new_account.spec.ts --trace on
```

To see the report in html I modified the file **playwright.config.ts** adding reporter: [['html', { outputFolder: 'my-report' }]] inside the *defineConfig*
```
export default defineConfig({
  testDir: './tests',
  ...
  reporter: [['html', { outputFolder: 'my-report' }]],
  ..
  
  },
```
To see the report of the test executed
```
npx playwright show-report my-report
```