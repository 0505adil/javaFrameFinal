import { Component, OnInit } from '@angular/core';
import {Todo} from "../../../../models/todo";
import {ActivatedRoute} from "@angular/router";
import {TodoService} from "../../../../services/todo.service";

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.css']
})
export class SearchDataComponent implements OnInit {
  todos: Todo[];
  constructor(private route: ActivatedRoute,
              private todoService: TodoService) { }

  ngOnInit() {
    this.findAllTodo();
  }
  findAllTodo(){
    this.todoService.findByDay(this.route.snapshot.queryParamMap.get('currentAt')).subscribe(perf => {
      this.todos = perf;
      console.log(perf);
    })
  }

  delete(id: any) {

  }
}
