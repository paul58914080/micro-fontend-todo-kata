import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreateTodoAppService} from './create-todo-app.service';

@Component({
  selector: 'create-todo',
  templateUrl: './create-todo-app.component.html',
  styleUrls: ['./create-todo-app.component.scss'],
})
export class CreateTodoAppComponent implements OnInit {
  todo: string;

  @Output() created = new EventEmitter<void>();

  constructor(private createTodoService: CreateTodoAppService) {
  }

  ngOnInit() {
    this.todo = '';
  }

  onSubmit() {
    this.createTodoService.create({completed: false, title: this.todo}).subscribe(() => {
      this.created.emit();
      this.todo = '';
    });
  }
}
