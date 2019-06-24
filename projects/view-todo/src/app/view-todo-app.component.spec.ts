import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodoAppComponent } from './view-todo-app.component';

describe('ViewTodoAppComponent', () => {
  let component: ViewTodoAppComponent;
  let fixture: ComponentFixture<ViewTodoAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTodoAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
