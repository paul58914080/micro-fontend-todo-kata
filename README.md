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

The kata is to create a [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for creating a todo item. 

We will start by creating a sub application called `create-todo`. The following command will be used to generate the same

`$ ng g application create-todo --style=scss --prefix=todo --viewEncapsulation=ShadowDom` 

since we are passing the argument as **`--viewEncapsulation=ShadowDom`** you can notice in main.ts the default encapsulation being set to ShadowDom

```js
platformBrowserDynamic().bootstrapModule(AppModule, {
  defaultEncapsulation: ViewEncapsulation.ShadowDom
})
```
Delete the default app module & component

### Create the module

`$ ng g m create-todo-app --flat=true`

### Create the component

`$ ng g c create-todo-app --module=create-todo-app --selector=create-todo --entryComponent=true --flat=true`

### Create the service

`$ ng g s create-todo-app --flat=true`

### Hosting the component

You may want to serve the sub-application (micro-frontend) as an individual application as well as a reference module from the main application. Now we will see how can we accomplish this both. 

#### For referencing the module of sub application in the main application and hosting it

As mentioned earlier, you would **_not_** need `bootstrap` but just `entryComponent` for this. So edit the module

**`create-todo-app.module.ts`**
```js
@NgModule({
  declarations: [ CreateTodoAppComponent ],
  providers: [ CreateTodoAppService ],
  exports: [ CreateTodoAppComponent ],
  imports: [ CommonModule, BrowserModule, FormsModule, HttpClientModule ],
  entryComponents: [ CreateTodoAppComponent ]
})
export class CreateTodoAppModule {
}
```

Next, you can directly refer the module of your sub application `CreateTodoAppModule` in the main application's `HomeModule`

**`home.module.ts`**
```js
import {CreateTodoAppModule} from '../../../projects/create-todo/src/app/create-todo-app.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CreateTodoAppModule],
  bootstrap: [HomeComponent],
  entryComponents: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
```

> **Note:** `schemas: [CUSTOM_ELEMENTS_SCHEMA]` tells that we can have non-angular element i.e. a web component in this case

`$ ng serve`

#### For hosting the sub application as a standalone application

We need to add a conditional `bootstrap` depending on the environment **`loadBootstrap`** variable. Generally you would have it **`true`** for non-prod and **`false`** for prod

**`create-todo-app.module.ts`**
```js
import {environment} from '../environments/environment';

@NgModule({
  declarations: [ CreateTodoAppComponent ],
  providers: [ CreateTodoAppService ],
  exports: [ CreateTodoAppComponent ],
  imports: [ CommonModule, BrowserModule, FormsModule, HttpClientModule ],
  entryComponents: [ CreateTodoAppComponent ],
  bootstrap: environment.loadBootstrap ? [CreateTodoAppComponent]: []
})
export class CreateTodoAppModule {
}
```

Now you can serve the sub project `create-todo` individually without the main application as

`$ ng serve create-todo`

### Making it as an web-component

#### Add `@angular/elements`

We can add angular elements to our project using the ng add command and pass in the name of our project.

`$ ng add @angular/elements --project=create-todo`

#### Create custom element

To use our component as a reusable widget, we just need to modify the way our **`CreateTodoAppModule`** bootstraps. 

We need to create the custom element and change the way we bootstrap with `ngDoBootstrap()`

```js
@NgModule({
  declarations: [ CreateTodoAppComponent ],
  providers: [ CreateTodoAppService ],
  exports: [ CreateTodoAppComponent ],
  imports: [ CommonModule, BrowserModule, FormsModule, HttpClientModule ],
  entryComponents: [ CreateTodoAppComponent ],
  bootstrap: environment.loadBootstrap ? [CreateTodoAppComponent]: []
})
export class CreateTodoAppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const createTodoElement = createCustomElement(CreateTodoAppComponent, {injector: this.injector});
    customElements.define('create-todo', createTodoElement);
  }
}
```

#### Packaging angular elements

To create a node build script, you'll need to install two more dependencies:

`$ npm install --save-dev concat fs-extra`

At the root of our project, create a folder `elements-build` and then create a file called `create-todo.js` and paste this in

```js
const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/create-todo/runtime.js',
    './dist/create-todo/polyfills.js',
    './dist/create-todo/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/create-todo.js');
  await fs.copyFile(
    './dist/create-todo/styles.css',
    'elements/create-todo.styles.css'
  );
})();
```

This script will take all of the scripts that the CLI generates and combine them into a single file. It will also move the CSS file over, though since we're using native encapsulation, this file will be empty.

Finally open up `package.json` and add a new script

```json
"build:create-todo:elements": "ng build create-todo --prod --output-hashing none && node elements-build/create-todo.js"
```

#### Hosting it as a web-component


```html
<html>
  <body>
    <todo-header></todo-header>
  </body>
  <!-- Needed based upon angular vs non-angular projects. We dont need zone.js for angular projects -->
  <script type="text/javascript" src="https://unpkg.com/zone.js"></script>
  <script type='text/javascript' src='todo-header.js'></script>
</html>
```

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

### Including in angular app doesn't show the the web component in production

> Credit: https://medium.com/@sri1980/multiple-angular-elements-apps-loading-in-one-window-7bcc95887ff4

We have this use case that we needed to support for our project which requires that the host system load the first frontend(main app) with angular along with all of its dependencies (.js files) and then allow to load another micro-frontend with the same approach. It sounded like a very easy thing to do but we came across challenges when we started implementing this approach.

The first frontend(main app) loaded fine without any issue. However, for some reason, the second micro-frontend(create-todo) wasn’t rendered although we can clearly see that all the dependencies (.js files) got loaded inside the browser. We didn't even see any error in the browser console so we were not sure what was causing the problem. After spending several hours of analyzing the code, I finally figured out what the issue was with 

#### Problem
     
It turns out that we ran into an issue with the global variable **webpackJsonp** when loading multiple angular elements from different frontend apps. When we loaded the first angular , it created **webpackJsonp** variable inside window object. Both frontend and micro-frontend were using the same variable name!
 
#### Solution

To avoid the conflict, we just had to override the default `webpackJsonp` variable name with some unique variable name specific to the angular app or element. Please follow the below steps to implement the solution.

##### 1. Install custom-webpack from angular-builders module

`npm i -D @angular-builders/custom-webpack`

##### 2. Make the below changes in **`angular.json`** in the sub-application section

```json
"architect": {
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      ...
      "customWebpackConfig": {
        "path": "projects/create-todo/extra-webpack.config.js",
        "mergeStrategies": {
          "externals": "replace"
        }
      }
    }
  }
}
```

##### 3.Create config file **`extra-webpack.config.js`** under project root folder with below content

```js
module.exports = {
  output: {
    jsonpFunction: 'webpackJsonpCreateTodo',
    library: 'createTodo'
  }
};
```
