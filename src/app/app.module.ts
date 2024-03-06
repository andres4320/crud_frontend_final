// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NbCardModule, NbThemeModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CountryComponent } from './country/country.component';
import { DepartamentComponent } from './departament/departament.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { NavbarComponent } from './navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    CountryComponent,
    DepartamentComponent,
    MunicipalityComponent,
    AppComponent,
    NavbarComponent,
  ], 
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NbThemeModule.forRoot(),
    NbCardModule,
    CommonModule,
    RouterModule.forRoot(routes),
    NavbarComponent,

    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
