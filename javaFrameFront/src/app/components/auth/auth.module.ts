import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../../interceptors/token";
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { FindAllTodosComponent } from './components/find-all-todos/find-all-todos.component';
import { GetListCurrentComponent } from './components/get-list-current/get-list-current.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchDataComponent } from './components/search-data/search-data.component';


@NgModule({
  declarations: [
    AuthComponent,
    AddTodoComponent,
    FindAllTodosComponent,
    GetListCurrentComponent,
    UpdateTodoComponent,
    SearchPageComponent,
    SearchDataComponent,
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
})
export class AuthModule {
}
