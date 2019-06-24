import {enableProdMode, ViewEncapsulation} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';
import {ViewTodoAppModule} from './app/view-todo-app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ViewTodoAppModule, {
  defaultEncapsulation: ViewEncapsulation.ShadowDom
})
  .catch(err => console.error(err));
