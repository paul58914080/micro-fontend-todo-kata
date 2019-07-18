import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from './todo';
import {ViewTodoAppService} from './view-todo-app.service';

@Component({
  selector: 'view-todo',
  templateUrl: './view-todo-app.component.html',
  styleUrls: ['./view-todo-app.component.scss']
})
export class ViewTodoAppComponent implements OnInit, OnDestroy {

  todos: Todo[];
  selectedAction: string;
  actions: string[];

  constructor(private viewService: ViewTodoAppService) {
  }

  ngOnInit() {
    this.actions = Object.values(Actions);
    this.selectedAction = Actions.Pending;
    this.getPendingTodo();
    // add listener to the create-todo-element
    const createTodoEl = document.querySelector('create-todo-element');
    createTodoEl.addEventListener('created', this.created);
  }

  getPendingTodo() {
    this.viewService.getPendingTodo().subscribe((response) => {
      this.todos = response;
    });
  }

  getAllTodo() {
    this.viewService.getAllTodo().subscribe((response) => {
      this.todos = response;
    });
  }

  getCompletedTodo() {
    this.viewService.getCompletedTodo().subscribe((response) => {
      this.todos = response;
    });
  }

  actionChanged(selectedAction: string) {
    switch (selectedAction) {
      case Actions.All:
        this.selectedAction = Actions.All;
        this.getAllTodo();
        break;
      case Actions.Completed:
        this.selectedAction = Actions.Completed;
        this.getCompletedTodo();
        break;
      default:
        this.selectedAction = Actions.Pending;
        this.getPendingTodo();
    }
  }

  completed(todo: Todo) {
    this.viewService.update(todo).subscribe(() => {
      this.actionChanged(this.selectedAction);
    });
  }

  ngOnDestroy(): void {
    // remove listener of the create-todo-element
    const createTodoEl = document.querySelector('create-todo-element');
    createTodoEl.removeEventListener('created', this.created);
  }

  created = () => {
    this.actionChanged(this.selectedAction);
  };
}

enum Actions {
  All = 'All',
  Completed = 'Completed',
  Pending = 'Pending'
}
