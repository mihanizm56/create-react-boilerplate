[![Tested with TestCafe](https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg)](https://github.com/DevExpress/testcafe)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Wildberries Boilerplate 2.0

## Architecture Sollutions

### Frontend:
  - The frontend architecture is based on WB mobile-site
  - The redux-architecture is based on Redux-Ducks
  - All Shared Components are located in src/_components
  - Fonts are located in public/_assets/fonts

## Development
This template offers you the type of development where you can independently develop the frontend part and the backend part:
  - To develop the frontend part you are to simply use src/ folder
  - To develop the mock backend part you are to develop your REST API as a usual express app in server/**

## Test
 - Boilerplate offers you to write unit-tests with jest and enzyme
 - Boilerplate offers you to write integration-tests with testcafe

## All Useful Scripts:

#### Prepare the Boilerplate:
```sh
$ npm run setup
``` 

#### Start to work with the Boilerplate:
```sh
$ npm run wb
``` 