import {NgModule} from '@angular/core';
import {CreateTodoAppComponent} from './create-todo-app.component';
import {BrowserModule} from '@angular/platform-browser';
import {CreateTodoAppModule} from './create-todo-app.module';

@NgModule({
  imports: [CreateTodoAppModule, BrowserModule],
  bootstrap: [CreateTodoAppComponent]
})
export class CreateTodoAppModuleWithBrowser {
}
