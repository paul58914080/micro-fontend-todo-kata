# micro-frontend-todo

The intention of this kata is to demonstrate the micro-frontend strategy using angular. I have chosen the a simple todo application. If you follow agile development then following are the stories that will be delivered:

**Story 1:** user would like to see all the todo items 

_User would like to see all the todo items that are pending by default. User should also be able to see the completed todo upon._ 

**Story 2:** user would like to create todo item

_User would like to create a todo item which should be displayed on the list as soon as it has been added._

**Story 3:** user would like to edit todo item

_User would like to edit a todo item which should be displayed on the list as soon as it has been edited. User should not be allowed to edit completed todo item._

## Kata
- [KATA-1: Create an application `micro-frontend-todo`](kata-1-create-an-application-micro-frontend-todo)
- [KATA-2: Create a sub-project `create-todo`](kata-2)
- [KATA-3: Create a sub-project `view-todo`](kata-3)
- [KATA-4: Build and publish](kata-4)
- [KATA-5: Feature toggle (change the wheels while driving)](kata-5)
- [Additional tips](additional-tips)

## KATA-1: Create an application `micro-frontend-todo`

The kata is to create an angular application. It should have the main layout and host navigation bar which will be common to the application.

You can use the following command

`ng new micro-frontend-todo --style=scss --prefix=todo`

> you can pass `--dryRun=true` to check the files that are going to be created.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. 

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 

Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Generate module and component

`$ ng g module layout && ng g component layout`

`$ ng g module layout/routes`

`$ ng g module home && ng g component home`

### Add bootstrap

`$ npm install bootstrap --save`

Import it in **`styles.scss`**

`@import "~bootstrap/scss/bootstrap";`

## KATA-2: Create a sub-project `create-todo`

## KATA-3: Create a sub-project `view-todo`

## KATA-4: Build and publish

## KATA-5: Feature toggle (change the wheels while driving)

## Additional tips

### karma.config.js

- Use quality gate
- Add coverage report
- Use source maps to debug your test
- Use headless

```js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/micro-frontend-todo'),
      reports: ['html', 'lcovonly', 'text-summary', 'json'],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 80,
        lines: 80,
        functions: 80
      }
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          ' --remote-debugging-port=9222'
        ]
      }
    }
  });
};

```
