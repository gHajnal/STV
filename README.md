# Search Term Verification - STV

This is a pet project. 

SVT is based on [CORS Anywhere project](https://github.com/Rob--W/cors-anywhere) and aims to provide feedback on the containment of a specific [Search term] within a given [URL]

#### Built with: NPM | JS | HTML | CSS | SASS | React

## How to run

1. Clone the repo
2. Run `npm install`
3. Run `node ./node_modules/cors-anywhere/server.js`
4. Visit `https://cors-anywhere.herokuapp.com/corsdemo` in browser
5. Click on: `Request temporary access to the demo server`
6. Run `npm start` or `npm start; sass --watch src:public/stylesheets` to run project locally

## Available Scripts

### `npm install`
Runs necessary installs for the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm start; sass --watch src:public/stylesheets`

Runs the app in development mode, along with SASS compilation. 

### `node ./node_modules/cors-anywhere/server.js`

Runs CORS-Anywhere 

## Current state: WIP
[Search term] is considered valid if it's length falls between 0-10

[URL] is considered valid if it contains 'http'

### Known issues

- [Verify button] seems disabled after editing input out of happy path. 
  workaround: Clicking away will update the state
