import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule
  ]
})
export class SharedModule {}
