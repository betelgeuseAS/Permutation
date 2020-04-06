import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';

import { TranslateModule } from '@ngx-translate/core';

import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    MomentPipe
  ],
  imports: [
    TranslateModule,
    FormsModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MomentPipe
  ]
})
export class SharedModule {}
