import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTodoAppComponent } from './create-todo-app.component';

@NgModule({
  declarations: [CreateTodoAppComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [CreateTodoAppComponent]
})
export class CreateTodoAppModule { }
