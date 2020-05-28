import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookDialogComponent } from './book-list/dialog/create-book-dialog/create-book-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BookListComponent,
    CreateBookDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
