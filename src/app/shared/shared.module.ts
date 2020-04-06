import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective
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
    DragDropModule
  ]
})
export class SharedModule {}
