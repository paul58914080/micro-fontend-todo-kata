import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoAppComponent } from './create-todo-app.component';

describe('CreateTodoAppComponent', () => {
  let component: CreateTodoAppComponent;
  let fixture: ComponentFixture<CreateTodoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTodoAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
