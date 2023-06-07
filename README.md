# Installation that I did

To use Playwright I need to istall Windows subsystem linux and node js.
After It I installed playwright
## Documentation:
	- https://playwright.dev/docs/intro

## Installation steps:
	- install wsl: windows subsystem linux -> wsl --install
	- install nvm (node js version manager): https://github.com/nvm-sh/nvm
		- which installs npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
	- install playwright: https://playwright.dev/docs/intro#installing-playwright

# How it is structured the folder

Folder **E2E tests** that contain:
- file .ts that are E2E tests **scripts** identified by the name of the flow (playwright files) 
- folder for the **Reports** per each flow, where you can open and see the html file that contain the status of the tests. 

The file **testPlanIaconoRita.html** for the Test plan


# The Test plan
The Test plan is created with FreeMind, for this you will find a file .mm (you can only open if you have FreeMind installed). But to be easier I exported as html file clickable, so you can open this file and you will see the mind map, where you can click in each test case and see the description, or directly scroll down to see each test case with the specific desription.
I created six sections for the E2E tests, one for each flow.
I identified some test cases with **priority 1**, and these are the tests that I implemented for the automated scripts.

For the cases I assume that:
- There is no specific password format
- At signup there is no email sent
- The article created is expected to be added in Your Feed and in Global Feed
- The tag is added only if you click ENTER when you fill the correspective field

Considering that I don't have detailed specifications I noticed ambiguities in the site that I would like to emphasize, but I didn't conisder in the tests
- Missing constrain for the email, for me should exist the check to register only email with the right format
- In the test I don't specify the layout checks, but I think should exist specific tests to check the layout per each page

# Analysis of the reports

## Creation New Account

## Login

## Creation New Article

## Edit Existing Article

## Adding Comment To An Existing Article

## Deletion An Existing Article
