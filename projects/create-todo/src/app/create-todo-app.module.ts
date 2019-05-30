import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateTodoAppComponent} from './create-todo-app.component';
import {FormsModule} from '@angular/forms';
import {CreateTodoAppService} from './create-todo-app.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

const requiredModules = [CommonModule, FormsModule, HttpClientModule];

const createTodoModuleConfig = isBrowserRequired => {
  return {
    declarations: [CreateTodoAppComponent],
    providers: [CreateTodoAppService],
    bootstrap: [CreateTodoAppComponent],
    exports: [CreateTodoAppComponent],
    imports: isBrowserRequired ? [...requiredModules, BrowserModule] : requiredModules
  };
};

@NgModule(createTodoModuleConfig(false))
export class CreateTodoAppModule {
}

@NgModule(createTodoModuleConfig(true))
export class CreateTodoAppModuleWithBrowser {
}
