import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewTodoAppComponent} from './view-todo-app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ViewTodoAppService} from './view-todo-app.service';

@NgModule({
  declarations: [ViewTodoAppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgbDropdownModule,
    FormsModule
  ],
  providers: [ViewTodoAppService],
  entryComponents: [ViewTodoAppComponent],
  bootstrap: [ViewTodoAppComponent],
  exports: [ViewTodoAppComponent]
})
export class ViewTodoAppModule {
}
