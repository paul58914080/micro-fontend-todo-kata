import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewTodoAppComponent} from './view-todo-app.component';
import {ViewTodoAppService} from './view-todo-app.service';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ViewTodoAppComponent', () => {
  let component: ViewTodoAppComponent;
  let fixture: ComponentFixture<ViewTodoAppComponent>;
  let todoViewService: ViewTodoAppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbDropdownModule,
        FormsModule
      ],
      declarations: [ViewTodoAppComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoViewService = fixture.debugElement.injector.get(ViewTodoAppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of all pending todo list on init', () => {
    const todos = [{completed: false, title: 'Watch Game of Thrones', id: 1}];
    spyOn(todoViewService, 'getPendingTodo').and.returnValue(of(todos));
    component.ngOnInit();
    expect(todoViewService.getPendingTodo).toHaveBeenCalled();
    expect(component.todos).toBe(todos);
    expect(component.actions).toEqual(['All', 'Completed', 'Pending']);
    expect(component.selectedAction).toBe('Pending');
  });

  it('should get the list of all todo list', () => {
    const todos = [{completed: false, title: 'Watch Game of Thrones', id: 1}, {
      completed: true,
      title: 'Lord of the rings',
      id: 2
    }];
    spyOn(todoViewService, 'getAllTodo').and.returnValue(of(todos));
    component.getAllTodo();
    expect(todoViewService.getAllTodo).toHaveBeenCalled();
    expect(component.todos).toBe(todos);
  });

  it('should get the list of all completed todo list', () => {
    const todos = [{completed: true, title: 'Lord of the rings', id: 1}];
    spyOn(todoViewService, 'getCompletedTodo').and.returnValue(of(todos));
    component.getCompletedTodo();
    expect(todoViewService.getCompletedTodo).toHaveBeenCalled();
    expect(component.todos).toBe(todos);
  });

  it('should get the appropriate todo list when the selected action changes', () => {
    let todos = [{completed: true, title: 'Watch Game of Thrones', id: 1}];
    spyOn(component, 'getCompletedTodo').and.callThrough();
    spyOn(todoViewService, 'getCompletedTodo').and.returnValue(of(todos));

    todos = [{completed: false, title: 'Watch Game of Thrones season 1', id: 2}];
    spyOn(component, 'getPendingTodo').and.callThrough();
    spyOn(todoViewService, 'getPendingTodo').and.returnValue(of(todos));

    todos = [{completed: false, title: 'Watch Game of Thrones', id: 1}, {
      completed: true,
      title: 'Lord of the rings',
      id: 2
    }];
    spyOn(component, 'getAllTodo').and.callThrough();
    spyOn(todoViewService, 'getAllTodo').and.returnValue(of(todos));

    component.actionChanged('Pending');
    fixture.detectChanges();
    expect(component.getPendingTodo).toHaveBeenCalled();

    component.actionChanged('All');
    expect(component.getAllTodo).toHaveBeenCalled();

    component.actionChanged('Completed');
    expect(component.getCompletedTodo).toHaveBeenCalled();
  });

  it('should on completion of a todo should update it as completed and refresh the current view', () => {
    component.selectedAction = 'Pending';
    spyOn(todoViewService, 'update').and.returnValue(of({}));
    spyOn(component, 'getPendingTodo').and.callThrough();
    spyOn(todoViewService, 'getPendingTodo').and.returnValue(of([{
      completed: false,
      title: 'Watch Game of Thrones',
      id: 1
    }]));
    const todo = {completed: true, title: 'Watch Game of Thrones', id: 1};
    component.completed(todo);
    expect(todoViewService.update).toHaveBeenCalledWith(todo);
    expect(component.getPendingTodo).toHaveBeenCalled();
  });
});
