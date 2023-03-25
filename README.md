# Zecure QA Test

## FE Requirements
The following is required to run these tests:

### Node JS: 
This can be installed from [node](https://nodejs.org/en/)

This should also install the npm package handler.

### Yarn: 
This can be installed via npm using the command
```bash
npm install -g yarn
```

Once that is done cd into to the project folder and run 
```bash
yarn
```
This will install all of the required dependencies.

## Running the FE tests in headed mode
When complete run:
```bash
npx cypress open
```
This will open the GUI.
Here you can select E2E Testing, where you should find guts-auto.cy.js