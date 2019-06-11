import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {CreateTodoAppModule} from '../../../projects/create-todo/src/app/create-todo-app.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CreateTodoAppModule],
  bootstrap: [HomeComponent],
  entryComponents: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
