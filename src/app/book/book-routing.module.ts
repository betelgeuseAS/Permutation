import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero-list/hero/hero.component';

const routes: Routes = [
  {
    path: 'book/:bookId/hero/:heroId',
    component: HeroComponent,
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
