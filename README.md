# koa2-redux-universal

## Contains

- [Koa2](http://koajs.com)
- [Webpack 2](https://webpack.js.org/)
- [Babel 6](https://babeljs.io/)
- [React](https://facebook.github.io/react)
- [Redux](http://redux.js.org)
- [PostCSS](http://postcss.org/)
- [Passport](http://passportjs.org/)
- [React-CSS-modules](https://github.com/gajus/babel-plugin-react-css-modules)
- [ESLint](http://eslint.org/)
- [Mocah](https://github.com/avajs/ava)

## Features
- Client
  - HMR(Client)
  - Code-Splitting(lazy load)
  - Manifest cache
  - CSS-module
  - React-Redux-Universal
- Server
  - CSRF
  - Passport

## Requirements
Make sure your system has the correct Node and Npm versions.

- Node 7.6.x
- Npm 4.1.x

## Usage
- Changing source code in `/src` and click save.
- open `http:localhost:8000`.
- Modified the content of env.sample and assign a new name to .env.

## Install
```
npm install
```
or if already have yarn
```
yarn
```

## Development
```
npm run dev
```

## Bundle
Bundling client and compiling server.
```
npm run build:prod
```

## Serve
```
npm run serve
```

LICENSE
=======

MIT
