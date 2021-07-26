import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isTrue: boolean ;
  errorText: string;
  errorColor: string;
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.infoForm();
  }
  infoForm(){
    this.form = this.fb.group({
      "login": ["", Validators.compose([Validators.required, Validators.email])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = this.form.getRawValue();
    this.userService.login(user).subscribe(perf => {
      this.authService.setToken(perf);
      if (this.authService.getRole().scopes.authority === 'ROLE_ADMIN') {
        this.router.navigateByUrl('/admin');
        return;
      }else if (this.authService.getRole().scopes.authority === 'ROLE_USER') {
        this.router.navigateByUrl('/auth');
        return;
      }
    }, error => {
      if (error.status === 401) {
        this.errorColor = 'danger';
        this.errorText = 'неверное имя пользователя или пароль';
        this.isTrue = true;
        setTimeout(() => {
          this.isTrue = false;
        }, 4000);
      }
    });
  }
}
