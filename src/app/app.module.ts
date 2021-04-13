import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//FORMULARIOS REACTIVOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//ANGULAR module
import { MaterializeModule } from './shared/materialize.module';

//PETICIONES HTTP
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//COMPONENTES
import { PrincipalComponent } from './components/principal/principal.component';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/userDetails/userDetails.component';
import { AddUserComponent } from './components/addUser/addUser.component';
import { ErrorViewComponent } from './shared/error-view/error-view.component';

//LATEX
import { KatexModule } from 'ng-katex';
import { InterceptorService } from './core/service/interceptor.service';
import { ErrorDialogService } from './core/service/error-dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    QuestionarioComponent,
    ResultadosComponent,
    LoginComponent,
    UserDetailsComponent,
    AddUserComponent,
    ErrorViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KatexModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    },
    ErrorDialogService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    ErrorViewComponent
  ]
})
export class AppModule { }
