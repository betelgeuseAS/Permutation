import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeroEditComponent } from './hero-list/hero/edit/hero-edit.component';
import { HeroViewComponent } from './hero-list/hero/view/hero-view.component';

const routes: Routes = [
  {
    path: 'book/:bookId/hero/:heroId/edit',
    component: HeroEditComponent,
    data: {
      title: 'hero',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: 'dashboard'
        },
        {
          label: '{{bookBreadcrumb}}',
          url: 'book/:bookId'
        },
        {
          label: '{{heroBreadcrumb}}',
          url: ''
        }
      ]
    }
  },
  {
    path: 'book/:bookId/hero/:heroId/view',
    component: HeroViewComponent,
    data: {
      title: 'hero',
      breadcrumb: [
        {
          label: 'Dashboard',
          url: 'dashboard'
        },
        {
          label: '{{bookBreadcrumb}}',
          url: 'book/:bookId'
        },
        {
          label: '{{heroBreadcrumb}}',
          url: ''
        }
      ]
    }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookRoutingModule {}
