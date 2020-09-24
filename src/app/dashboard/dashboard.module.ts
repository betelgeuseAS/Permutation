import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookStatisticComponent } from './book-statistic/book-statistic.component';
import { EventComponent } from '../event/event.component';
import { EventListComponent } from '../event/event-list/event-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BookListComponent,
    BookStatisticComponent,
    EventComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
