import { Component, OnInit } from '@angular/core';
import {User} from "../../../../models/user";
import {Todo} from "../../../../models/todo";
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {TodoService} from "../../../../services/todo.service";

@Component({
  selector: 'app-find-all-todos',
  templateUrl: './find-all-todos.component.html',
  styleUrls: ['./find-all-todos.component.css']
})
export class FindAllTodosComponent implements OnInit {
  user: User;
  todos: Todo[];
  constructor(private authService: AuthService,
              private userService: UserService,
              private todoService: TodoService) { }

  ngOnInit() {
    this.getAllTodo();
  }
  getAllTodo(){
    if (this.authService.checkAvailability()){
      this.userService.currentUser().subscribe(perf => {
        this.user = perf;
        this.todoService.findAllByUserId().subscribe(perf => {
          this.todos = perf;
        })
      })
    }
  }

  delete(id: number) {
    this.todoService.deleteById(id).subscribe(perf => {
      this.getAllTodo();
    })
  }
}
