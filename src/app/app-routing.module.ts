import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { BookComponent } from './book/book.component';
import { EventListComponent } from './event/event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'book/:bookId',
    component: BookComponent,
    data: {
      title: 'book',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: 'dashboard'
        },
        {
          label: '{{bookBreadcrumb}}',
          url: ''
        }
      ]
    }
  },
  {
    path: 'dashboard/events',
    component: EventListComponent,
    data: {
      title: 'events',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: 'dashboard'
        },
        {
          label: 'Events',
          url: ''
        }
      ]
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'dashboard',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: 'dashboard'
        }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
