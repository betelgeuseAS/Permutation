import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { getRepository } from 'typeorm';
import { DOCUMENT } from '@angular/common';

interface SheetData {
  entity: any;
}

@Component({
  selector: 'app-remove-sheet',
  templateUrl: './remove-all-sheet.component.html',
  styleUrls: ['./remove-all-sheet.component.sass']
})
export class RemoveAllSheetComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SheetData,
    private bottomSheetRef: MatBottomSheetRef<RemoveAllSheetComponent>
  ) {}

  ngOnInit(): void {}

  removeAllHandler() {
    const {entity} = this.data;

    if (!entity) {
      return;
    }

    const heroRepository = getRepository(entity);
    // heroRepository.delete()
    //   .then(() => {
    //     //
    //   });
  }

  cancelHandler() {
    this.bottomSheetRef.dismiss();
  }
}
