import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateTodoAppComponent} from './create-todo-app.component';
import {FormsModule} from '@angular/forms';
import {CreateTodoAppService} from './create-todo-app.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ CreateTodoAppComponent ],
  providers: [ CreateTodoAppService ],
  exports: [ CreateTodoAppComponent ],
  imports: [ CommonModule, FormsModule, HttpClientModule ],
  entryComponents: [ CreateTodoAppComponent ]
})
export class CreateTodoAppModule {
}
