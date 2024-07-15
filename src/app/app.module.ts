import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { Route, Router } from '@angular/router';
import { DynamicCardModule } from './components/dynamic-card/dynamic-card.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



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
  ]
})
export class AppModule {
}
