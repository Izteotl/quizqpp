import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/userDetails/userDetails.component';
import { AddUserComponent } from './components/addUser/addUser.component';






const routes: Routes = [
  { path: 'login'       , component: LoginComponent       , pathMatch: 'full'},
  { path: 'userDetails' , component: UserDetailsComponent , pathMatch: 'full'},
  { path: 'addUser'     , component: AddUserComponent     , pathMatch: 'full'},
  { path: 'principal'   , component: PrincipalComponent   , pathMatch: 'full'},
  { path: 'questionario', component: QuestionarioComponent, pathMatch: 'full'},
  { path: 'resultados'  , component: ResultadosComponent  , pathMatch: 'full'},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
