import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {TodoService} from "../../../../services/todo.service";
import {User} from "../../../../models/user";
import {Todo} from "../../../../models/todo";

@Component({
  selector: 'app-get-list-current',
  templateUrl: './get-list-current.component.html',
  styleUrls: ['./get-list-current.component.css']
})
export class GetListCurrentComponent implements OnInit {
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
        this.todoService.findAllByUserIdAndCurrentDate().subscribe(perf => {
         this.todos = perf;
        })
      })
    }
  }
}
