import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    ReactiveFormsModule
  ]
})
export class SharedModule {}
