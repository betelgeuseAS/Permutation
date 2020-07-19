import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroComponent } from './hero-list/hero/hero.component';
import { AudioRecorderComponent } from '../shared/components/audio-recorder/audio-recorder.component';

@NgModule({
  declarations: [
    BookComponent,
    HeroListComponent,
    HeroComponent,
    AudioRecorderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookRoutingModule
  ]
})

export class BookModule {}
