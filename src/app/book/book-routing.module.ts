import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero-list/hero/hero.component';
import { NoteComponent } from './note-list/note/note.component';
import {PlaceComponent} from './place-list/place/place.component';

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
  },
  {
    path: 'book/:bookId/note/:noteId',
    component: NoteComponent,
    data: {
      title: 'note',
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
          label: '{{noteBreadcrumb}}',
          url: ''
        }
      ]
    }
  },
  {
    path: 'book/:bookId/place/:placeId',
    component: PlaceComponent,
    data: {
      title: 'place',
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
          label: '{{placeBreadcrumb}}',
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
