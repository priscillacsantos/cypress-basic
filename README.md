# Automated Testing with Cypress - Basics

Sample project.


## Pre-requirements

It is required to have Node.js and npm installed to run this project.

I used versions  `v16.20.2` and `8.19.4` of Node.js and npm, respectively. I suggest you use the same or later versions.

For git, I'm using version: `2.45.0`.
Cypress version: `9.5.1` [From the project root, run the command npm install cypress@9.5.1 --save-dev (or npm i cypress@9.5.1 -D for the short version)]

## Installation

Run `npm install` (or npm i for the short version) to install the dev dependencies.


## Tests

You can run the tests simulating a desktop or mobile viewport.

### Desktop

Run `npm run test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

### Mobile

Run `npm run test:mobile` to run the test in headless mode on a mobile viewport.

Or, run `npm run cy.open.mobile` to open Cypress in interactive mode on a mobile viewport.


## Support this project
--