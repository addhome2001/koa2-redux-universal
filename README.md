# koa2-redux-universal

### The [pure-SSR](https://github.com/addhome2001/koa2-redux-universal/tree/pure-SSR) is the branch for someone who needs boilerplate.

## Contains

- [Koa2](http://koajs.com)
- [Webpack 4](https://webpack.js.org/)
- [Babel 7](https://babeljs.io/)
- [React 16](https://facebook.github.io/react)
- [Redux](http://redux.js.org)
- [React-Router 4](https://reacttraining.com/react-router/)
- [PostCSS](http://postcss.org/)
- [Passport](http://passportjs.org/)
- [React-CSS-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- [ESLint](http://eslint.org/)
- [Mocha](https://mochajs.org/)
- [Docker](https://docs.docker.com)
- [Prettier](https://prettier.io/)

## Features
- Client
  - HMR(Port: 8081)
  - Code-Splitting(lazy load)
  - Manifest cache
  - CSS-module
  - React-Redux-Universal
- Server
  - CSRF
  - Passport

## Requirements
Make sure your system has the correct Node and Npm versions.

- Node 8

## Usage
- Changing source code in `/src` and click save.
- open `http:localhost:8000`.
- Modified the content of env.sample and assign a new name to .env.

## Install
```
yarn
```

## Docker-Compose
build
```
docker-compose build
```
Development
```
docker-compose up
```
Production
```
docker-compose -f docker-compose.prod.yml up
```
down
```
docker-compose down -v
```

LICENSE
