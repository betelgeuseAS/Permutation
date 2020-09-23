import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InfoQuillDialogComponent } from './info-quill-dialog/info-quill-dialog.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { CreateBookDialogComponent } from './create-book-dialog/create-book-dialog.component';
import { AddItemPlotDialogComponent } from './add-item-plot-dialog/add-item-plot-dialog.component';
import { RemoveSheetComponent } from './remove-sheet/remove-sheet.component';
import { PlotItemSheetComponent } from './plot-item-sheet/plot-item-shet.component';
import { SaveEventDialogComponent } from './save-event-dialog/save-event-dialog.component';
import { RemoveAllSheetComponent } from './remove-all-sheet/remove-all-sheet.component';

@NgModule({
  declarations: [
    InfoQuillDialogComponent,
    CreateDialogComponent,
    CreateBookDialogComponent,
    AddItemPlotDialogComponent,
    RemoveSheetComponent,
    PlotItemSheetComponent,
    SaveEventDialogComponent,
    RemoveAllSheetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})

export class DialogsModule {}
