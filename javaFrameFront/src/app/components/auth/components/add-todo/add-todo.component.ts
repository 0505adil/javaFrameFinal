import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/user";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {Todo} from "../../../../models/todo";
import {TodoService} from "../../../../services/todo.service";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;
  errorText: string;
  isTrue: boolean;
  errorColor: string;
  user: User;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private todoService: TodoService) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser(){
    if (this.authService.checkAvailability()){
      this.userService.currentUser().subscribe(perf => {
        this.user = perf;
        this.getForm();
      })
    }
  }
  getForm(){
    this.form = this.fb.group({
      "description": ["", Validators.compose([Validators.required])],
      "currentAt": ["", Validators.compose([Validators.required])],
    });
  }
  save(){
    if (this.form.invalid){
      return;
    }
    const todo: Todo = this.form.getRawValue();
    console.log(todo)
    this.todoService.addTodo(todo).subscribe(perf => {
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
