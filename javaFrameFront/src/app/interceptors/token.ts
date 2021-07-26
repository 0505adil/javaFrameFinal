import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private auth: AuthService;
  constructor(authService: AuthService) {
    this.auth = authService;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.checkAvailability()) {
      req = req.clone({ setHeaders: {Authorization: environment.tokenPrefix + this.auth.getToken()}
      });
    }
    return next.handle(req);
  }
}
