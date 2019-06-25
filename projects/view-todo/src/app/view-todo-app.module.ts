import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewTodoAppComponent} from './view-todo-app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ViewTodoAppService} from './view-todo-app.service';
import {createCustomElement} from '@angular/elements';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [ViewTodoAppComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule, NgbDropdownModule, FormsModule],
  providers: [ViewTodoAppService],
  entryComponents: [ViewTodoAppComponent],
  bootstrap: environment.loadBootstrap ? [ViewTodoAppComponent] : [],
  exports: [ViewTodoAppComponent]
})
export class ViewTodoAppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const createTodoElement = createCustomElement(ViewTodoAppComponent, {injector: this.injector});
    customElements.define('view-todo-element', createTodoElement);
  }
}
