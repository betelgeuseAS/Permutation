import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {HeroComponent} from './hero-list/hero/hero.component';

const routes: Routes = [
  {
    path: 'book/hero/:id',
    component: HeroComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookRoutingModule {}
