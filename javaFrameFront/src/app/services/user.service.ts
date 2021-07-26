import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + '/api/users';
  loginUrl = environment.apiUrl + '/login';
  constructor(public http: HttpClient) {
  }
  public register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  public addAdmin(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/addAdmin', user);
  }
  public login(user: User) {
    return this.http.post(this.loginUrl, user, {responseType: 'text'}).pipe();
  }
  public currentUser(): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/current', {});
  }
  public validate(login: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/validate', login).pipe(
    );
  }
  public updatePassword(user: User, id: number): Observable<any> {
    return this.http.put<User>(this.apiUrl + '/' + id, user);
  }

  public getAllUsersByRoleUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/getAllUsersByRoleUser');
  }
  public findAllEmployers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + '/findAllEmployers');
  }
  public findAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl + '/findAllUsers');
  }
  public createData(formData: FormData): Observable<any>{
    return this.http.post(this.apiUrl + '/add',formData);
  }
  public deleteById(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
