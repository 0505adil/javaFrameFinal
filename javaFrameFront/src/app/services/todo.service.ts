import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = environment.apiUrl + '/api/todos';
  constructor(public http: HttpClient) {
  }
  public addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  public update(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(this.apiUrl + '/' + todo.id, todo);
  }

  public getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
  public findById(id: number): Observable<Todo>{
    return this.http.get<Todo>(this.apiUrl + '/' + id);
  }
  public findByDay(currentAt: string): Observable<Todo[]>{
    let params = new HttpParams();
    params = params.append('currentAt', currentAt);
    return this.http.get<Todo[]>(this.apiUrl + '/getAllTodoByDay/', {params: params});
  }
  public findAllByUserId(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiUrl + '/findAllByUserId');
  }
  public findAllByUserIdAndCurrentDate(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiUrl + '/findAllByCurrentDateAndUserId');
  }
  public deleteById(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
