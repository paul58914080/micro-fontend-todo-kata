# micro-frontend-todo

The intention of this kata is to demonstrate the micro-frontend strategy using angular. I have chosen the a simple todo application. If you follow agile development then following are the stories that will be delivered:

**Story 1:** user would like to see all the todo items 

_User would like to see all the todo items that are pending by default. User should also be able to see the completed todo upon._ 

**Story 2:** user would like to create todo item

_User would like to create a todo item which should be displayed on the list as soon as it has been added._

**Story 3:** user would like to edit todo item

_User would like to edit a todo item which should be displayed on the list as soon as it has been edited. User should not be allowed to edit completed todo item._

## Kata
- [KATA-1: Create an application `micro-frontend-todo`](#kata-1-create-an-application-micro-frontend-todo)
- [KATA-2: Create a sub-project `create-todo`](#kata-2-create-a-sub-project-create-todo)
- [KATA-3: Create a sub-project `view-todo`](#kata-3-create-a-sub-project-view-todo)
- [KATA-4: Build and publish](#kata-4-build-and-publish)
- [KATA-5: Feature toggle (change the wheels while driving)](#kata-5-feature-toggle-change-the-wheels-while-driving)
- [Additional tips](#additional-tips)

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

The kata is to create a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for create a todo item. 

We will start by creating a sub application called `create-todo`. The following command will be used to generate the same

`ng g application create-todo --style=scss --prefix=todo --viewEncapsulation=ShadowDom` 

since we are passing the argument as **`--viewEncapsulation=ShadowDom`** you can notice in main.ts the default encapsulation being set to ShadowDom

```js
platformBrowserDynamic().bootstrapModule(AppModule, {
  defaultEncapsulation: ViewEncapsulation.ShadowDom
})
```
Delete the default app module & component

### Create the module

`ng g m create-todo-app --flat=true`

### Create the component

`ng g c create-todo-app --module=create-todo-app --selector=create-todo-root --entryComponent=true --flat=true`

### Create the service

`ng g s create-todo-app --flat=true`

You may want to serve the sub-project (micro-frontend) as an individual application as well as a reference module from the main application. For the main application since you already have a bootstrap with `BrowserModule` you do not want to do this again. The bootstrap with BrowserModule is only required when you want to run it locally as a standalone application for the micro-frontend in this case the create-todo. In order to separate these I have the following two modules

### Hosting the component

#### For referencing the module of sub project in the main application

As mentioned earlier, you would **_not_** need `BrowserModule` for this. So edit the module

**`create-todo-app.module.ts`**
```js
@NgModule({
  declarations: [ CreateTodoAppComponent ],
  providers: [ CreateTodoAppService ],
  exports: [ CreateTodoAppComponent ],
  imports: [ CommonModule, FormsModule, HttpClientModule ],
  entryComponents: [ CreateTodoAppComponent ]
})
export class CreateTodoAppModule {
}
```

> Note: there is no bootstrap, just an `entryComponent`

**`home.module.ts`**
```js
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CreateTodoAppModule],
  bootstrap: [HomeComponent],
  entryComponents: [HomeComponent]
})
export class HomeModule {
}
```

Now you can serve the application which references the sub project `create-todo` as

`$ ng serve`

#### For hosting the sub-project

As mentioned earlier, you would need `BrowserModule` for this. So create a new module

`ng g m create-todo-app-browser --flat=true`

**`create-todo-app-browser.module.ts`**
```js
@NgModule({
  imports: [CreateTodoAppModule, BrowserModule],
  bootstrap: [CreateTodoAppComponent]
})
export class CreateTodoAppModuleWithBrowser {
}
```

**`main.ts`** - bootstrap with **`CreateTodoAppModuleWithBrowser`** (the module with browser)
```js
platformBrowserDynamic().bootstrapModule(CreateTodoAppModuleWithBrowser, {
  defaultEncapsulation: ViewEncapsulation.ShadowDom
})
  .catch(err => console.error(err));
```

Now you can serve the sub project `create-todo` individually without the main application as

`$ ng serve create-todo`

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
