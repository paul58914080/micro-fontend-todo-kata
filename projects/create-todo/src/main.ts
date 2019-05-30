import {enableProdMode, ViewEncapsulation} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CreateTodoAppModuleWithBrowser} from './app/create-todo-app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CreateTodoAppModuleWithBrowser, {
  defaultEncapsulation: ViewEncapsulation.ShadowDom
})
  .catch(err => console.error(err));
