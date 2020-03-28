import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';

import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { HeroListComponent } from './hero-list/hero-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookComponent,
    HeroListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BookModule {}
