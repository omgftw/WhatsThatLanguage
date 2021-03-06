import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule, LiveAnnouncer } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Third party JS
import 'hammerjs';
import * as _ from 'lodash';
import * as highlight from 'highlight.js';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    LiveAnnouncer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
