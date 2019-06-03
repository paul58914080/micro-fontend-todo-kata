import {enableProdMode, ViewEncapsulation} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';
import {CreateTodoAppModuleWithBrowser} from './app/create-todo-app-browser.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CreateTodoAppModuleWithBrowser, {
  defaultEncapsulation: ViewEncapsulation.ShadowDom
})
  .catch(err => console.error(err));
