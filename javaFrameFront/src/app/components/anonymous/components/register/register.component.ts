import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorText: string;
  isTrue: boolean;
  errorColor: string;
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router){ }

  ngOnInit(): void {
    this.infoForm();
  }
  infoForm(){
    this.form = this.fb.group({
      "login": ["", Validators.compose([Validators.required, Validators.email])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      "firstName": ["", Validators.compose([Validators.required])],
      "lastName": ["", Validators.compose([Validators.required])],
      "phoneNumber": ["", Validators.compose([Validators.required])],
    });
  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    const user: User = this.form.getRawValue();
    this.userService.register(user).subscribe(perf => {
      this.form.reset();
      this.isTrue = true;
      this.errorColor = 'success';
      this.errorText = 'Успешно добавлено';
      setTimeout(() => {
        this.isTrue = false;
      }, 4000);
    }, error => {
      if (error.error.message === 'login exists') {
        this.isTrue = true;
        this.errorColor = 'danger';
        this.errorText = 'Пользователь с этим именем уже существует!';
        setTimeout(() => {
          this.isTrue = false;
        }, 4000);
      }
    });
  }
}
