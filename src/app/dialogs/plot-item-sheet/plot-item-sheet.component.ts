import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { getRepository } from 'typeorm';
import { Book } from '../../data-access/entities/book.entity';

interface SheetData {
  itemContext: object;
}

@Component({
  selector: 'app-remove-sheet',
  templateUrl: './plot-item-sheet.component.html',
  styleUrls: ['./plot-item-sheet.component.sass']
})
export class PlotItemSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SheetData,
    private bottomSheetRef: MatBottomSheetRef<PlotItemSheetComponent>
  ) {}

  ngOnInit(): void {}

  addHandler() {

  }

  editHandler() {

  }

  removeHandler() {

  }

  cancelHandler() {
    this.bottomSheetRef.dismiss();
    // event.preventDefault();
  }
}
