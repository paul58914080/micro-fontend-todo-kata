import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewTodoAppComponent} from './view-todo-app.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [ViewTodoAppComponent],
  imports: [
    CommonModule,
    BrowserModule
  ],
  entryComponents: [ViewTodoAppComponent],
  bootstrap: [ViewTodoAppComponent]
})
export class ViewTodoAppModule {
}
