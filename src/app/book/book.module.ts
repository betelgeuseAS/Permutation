import { NgModule } from '@angular/core';

import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { HeroListComponent } from './hero-list/hero-list.component';

@NgModule({
  declarations: [
    BookComponent,
    HeroListComponent
  ],
  imports: [
    SharedModule,
    BookRoutingModule
  ]
})
export class BookModule {}
