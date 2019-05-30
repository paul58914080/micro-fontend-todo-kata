import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateTodoAppComponent} from './create-todo-app.component';
import {FormsModule} from '@angular/forms';
import {CreateTodoAppService} from './create-todo-app.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [ CreateTodoAppComponent ],
  providers: [ CreateTodoAppService ],
  exports: [ CreateTodoAppComponent ],
  imports: [ CommonModule, FormsModule, HttpClientModule ]
})
export class CreateTodoAppModule {
}

@NgModule({
  imports: [ CreateTodoAppModule, BrowserModule ],
  bootstrap: [ CreateTodoAppComponent ]
})
export class CreateTodoAppModuleWithBrowser {
}
