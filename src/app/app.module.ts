import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { Route, Router } from '@angular/router';
import { DynamicCardModule } from './components/dynamic-card/dynamic-card.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    DynamicCardModule
  ]
})
export class AppModule {
}
