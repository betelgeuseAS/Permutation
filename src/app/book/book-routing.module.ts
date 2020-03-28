import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book.component';

const routes: Routes = [
  // {
  //   path: 'book/:id',
  //   component: BookComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {}
