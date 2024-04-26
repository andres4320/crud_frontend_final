import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCardModule, NbThemeModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";
import { CookieService } from "ngx-cookie-service";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [], 
  imports: [
    AppComponent,
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
    DataTablesModule, 
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [CookieService],
  bootstrap: [],
})
export class AppModule { }
