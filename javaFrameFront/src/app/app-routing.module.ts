import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {AdminGuard} from "./guards/admin.guard";
import {UserGuard} from "./guards/user.guard";
const routes: Routes = [
  {path: '', loadChildren: () => import('./components/anonymous/anonymous.module').then(m => m.AnonymousModule)},
  {path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), canActivate: [UserGuard], data: {role: 'ROLE_USER'}},
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
