import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroComponent } from './hero-list/hero/hero.component';
import { UpdateBookDialogComponent } from './dialog/update-book-dialog/update-book-dialog.component';
import { CreateHeroDialogComponent } from './hero-list/dialog/create-hero-dialog/create-hero-dialog.component';

@NgModule({
  declarations: [
    BookComponent,
    HeroListComponent,
    HeroComponent,
    UpdateBookDialogComponent,
    CreateHeroDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule
  ]
})
export class BookModule {}
