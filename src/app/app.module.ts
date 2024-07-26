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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [RegisterService, LoginService]
})
export class AppModule {
}
