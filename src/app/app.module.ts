import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap'; //You could only import modules with components you need.

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookListComponent } from './dashboard/book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
