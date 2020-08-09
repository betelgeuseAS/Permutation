import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InfoQuillDialogComponent } from './info-quill-dialog/info-quill-dialog.component';
import { CreateHeroDialogComponent } from './create-hero-dialog/create-hero-dialog.component';
import { CreateBookDialogComponent } from './create-book-dialog/create-book-dialog.component';
import { RemoveSheetComponent } from './remove-sheet/remove-sheet.component';
import { AddItemPlotComponent } from './add-item-plot/add-item-plot.component';

@NgModule({
  declarations: [
    InfoQuillDialogComponent,
    CreateHeroDialogComponent,
    CreateBookDialogComponent,
    AddItemPlotComponent,
    RemoveSheetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class DialogsModule {}
