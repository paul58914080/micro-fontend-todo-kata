import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './todo';

@Injectable({
  providedIn: 'root'
})
export class CreateTodoAppService {

  constructor(private httpClient: HttpClient) {
  }

  create(todo: Todo): Observable<void> {
    return this.httpClient.post<void>('/todo', todo);
  }
}
