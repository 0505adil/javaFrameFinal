import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../../../services/todo.service";
import {Todo} from "../../../../models/todo";
import {ActivatedRoute} from "@angular/router";
export class Done {
  name: string;
  status: number;
  constructor() {
  }
}
@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {
  form: FormGroup;
  errorText: string;
  isTrue: boolean;
  errorColor: string;
  todo: Todo;
  constructor(private fb: FormBuilder,
              private todoService: TodoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.get();
  }
  get(){
    this.route.params.subscribe(value => {
      this.todoService.findById(value.id).subscribe(perf => {
        this.todo = perf;
        console.log(this.todo.done);
        this.getForm();
      })
    })
  }
  getForm(){
    this.form = this.fb.group({
      "description": [this.todo.description, Validators.compose([Validators.required])],
      "currentAt": [this.todo.currentAt, Validators.compose([Validators.required])],
      "done": [this.todo.done, Validators.compose([Validators.required])],
    });
  }
  save(){
    if (this.form.invalid){
      return;
    }
    const todo: Todo = this.form.getRawValue();
    todo.done = Number(this.form.value.done);
    todo.id = this.todo.id;
    todo.user = this.todo.user;
    this.todoService.update(todo).subscribe(perf => {
      this.form.reset();
      this.todo = todo;
      this.isTrue = true;
      this.errorColor = 'success';
      this.errorText = 'Успешно обновлено';
      setTimeout(() => {
        this.isTrue = false;
      }, 4000);
    }, error => {
      console.log(error);
    })
  }
}
