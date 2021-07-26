import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AddTodoComponent} from "./components/add-todo/add-todo.component";
import {FindAllTodosComponent} from "./components/find-all-todos/find-all-todos.component";
import {GetListCurrentComponent} from "./components/get-list-current/get-list-current.component";
import {UpdateTodoComponent} from "./components/update-todo/update-todo.component";
import {SearchPageComponent} from "./components/search-page/search-page.component";
import {SearchDataComponent} from "./components/search-data/search-data.component";
const routes: Routes = [
  {path: '', component: AuthComponent, children: [
      {path: '', redirectTo: '/auth/findAllTodos', pathMatch: 'full'},
      {path: 'addTodo', component: AddTodoComponent},
      {path: 'findAllTodos', component: FindAllTodosComponent},
      {path: 'findAllCurrentday', component: GetListCurrentComponent},
      {path: 'updateTodo/:id', component: UpdateTodoComponent},
      {path: 'searchPage', component: SearchPageComponent},
      {path: 'searchData', component: SearchDataComponent}
    ]}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
