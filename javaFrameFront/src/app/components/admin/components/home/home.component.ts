import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  errorText: string;
  isTrue: boolean;
  errorColor: string;
  user: User;
  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService) {
  }
  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    if (this.authService.checkAvailability()) {
      this.userService.currentUser().subscribe(perf => {
        this.user = perf;
        this.getForm();
      })
    }
  }
  getForm() {
    this.form = this.fb.group({
      "login": ["", Validators.compose([Validators.required])],
      "password": ["", Validators.compose([Validators.required])],
      "firstName": ["", Validators.compose([Validators.required])],
      "lastName": ["", Validators.compose([Validators.required])],
      "phoneNumber": ["", Validators.compose([Validators.required])],
    });
  }
  save() {
    if (this.form.invalid) {
      return;
    }
    const user: User = this.form.getRawValue();
    this.userService.addAdmin(user).subscribe(perf => {
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
        this.errorText = 'Login Exists';
        setTimeout(() => {
          this.isTrue = false;
        }, 4000);
      }
    })
  }
}
