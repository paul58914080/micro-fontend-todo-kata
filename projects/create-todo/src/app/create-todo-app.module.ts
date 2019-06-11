import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateTodoAppComponent} from './create-todo-app.component';
import {FormsModule} from '@angular/forms';
import {CreateTodoAppService} from './create-todo-app.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [ CreateTodoAppComponent ],
  providers: [ CreateTodoAppService ],
  exports: [ CreateTodoAppComponent ],
  imports: [ CommonModule, BrowserModule, FormsModule, HttpClientModule ],
  entryComponents: [ CreateTodoAppComponent ],
  bootstrap: environment.loadBootstrap ? [CreateTodoAppComponent]: [],
})
export class CreateTodoAppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const createTodoElement = createCustomElement(CreateTodoAppComponent, {injector: this.injector});
    customElements.define('create-todo-element', createTodoElement);
  }
}
