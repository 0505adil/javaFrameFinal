import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient) {
  }
  public setToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
    console.log(this.getToken());
  }
  public getToken() {
    return localStorage.getItem(environment.tokenKey);
  }
  checkAvailability(): boolean {
    const auth = this.getToken();
    return !!auth;
  }
  public authorize(token: string) {
    this.setToken(token);
  }

  public getRole() {
    const payload = jwt_decode(this.getToken());
    return payload;
  }

  public logout() {
    localStorage.removeItem(environment.tokenKey);
    console.log('TOKEN DELETED');
  }
}
