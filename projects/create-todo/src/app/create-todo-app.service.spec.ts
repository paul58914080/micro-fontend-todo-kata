import { TestBed } from '@angular/core/testing';

import { CreateTodoAppService } from './create-todo-app.service';

describe('CreateTodoAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateTodoAppService = TestBed.get(CreateTodoAppService);
    expect(service).toBeTruthy();
  });
});
