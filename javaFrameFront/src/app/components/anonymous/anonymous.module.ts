import {NgModule} from "@angular/core";
import {AnonymousComponent} from "./anonymous.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AnonymousRoutingModule} from "./anonumous-routing.module";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {TokenInterceptor} from "../../interceptors/token";

@NgModule({
  declarations: [
    AnonymousComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AnonymousRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class AnonymousModule {
}
