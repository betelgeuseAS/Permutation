import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DOCUMENT } from '@angular/common';
import { DatabaseService } from '../../data-access/database.service';
import { ToastService } from 'angular-toastify';

interface SheetData {
  entity: any;
}

@Component({
  selector: 'app-remove-all-sheet',
  templateUrl: './remove-all-sheet.component.html',
  styleUrls: ['./remove-all-sheet.component.sass']
})
export class RemoveAllSheetComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SheetData,
    private bottomSheetRef: MatBottomSheetRef<RemoveAllSheetComponent>,
    private databaseService: DatabaseService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  removeAllHandler() {
    const {entity} = this.data;

    if (!entity) {
      return;
    }

    this.databaseService
      .connection
      .then(async connection => {
        await connection
          .getRepository(entity)
          .createQueryBuilder()
          .delete()
          .execute();
      })
      .then(() => {
        this.bottomSheetRef.dismiss();

        this.toastService.success('All records successfully deleted');
      })
      .catch(() => {
        this.toastService.warn('Unable to delete records');
      });
  }

  cancelHandler() {
    this.bottomSheetRef.dismiss();
  }
}
