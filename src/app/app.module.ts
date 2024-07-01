import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterModule } from './component/register/register.module';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { Route, Router } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class AppModule {
}
