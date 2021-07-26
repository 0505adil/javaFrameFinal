import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private auth: AuthService, private userService: UserService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = next.data.role;
    const user = this.auth.getRole();
    console.log(user.scopes.authority);
    if (this.auth.checkAvailability() && user.scopes.authority === role) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
