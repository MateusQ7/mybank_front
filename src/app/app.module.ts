import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { Route, Router } from '@angular/router';
import { DynamicCardModule } from './components/dynamic-card/dynamic-card.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RegisterService } from './pages/register/register.service';
import { LoginService } from './pages/login/login.service';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    DynamicCardModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
  ],
  providers: [RegisterService, LoginService]
})
export class AppModule {
}
