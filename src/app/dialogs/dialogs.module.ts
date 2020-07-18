import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {InfoQuillDialogComponent} from './info-quill-dialog/info-quill-dialog.component';

@NgModule({
  declarations: [
    InfoQuillDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class DialogsModule {}
