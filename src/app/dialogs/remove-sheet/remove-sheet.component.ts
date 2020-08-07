import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { getRepository } from 'typeorm';
import { Book } from '../../data-access/entities/book.entity';
import { DOCUMENT } from '@angular/common';

interface SheetData {
  entity: any;
  id: number;
  name?: string;
}

@Component({
  selector: 'app-remove-sheet',
  templateUrl: './remove-sheet.component.html',
  styleUrls: ['./remove-sheet.component.sass']
})
export class RemoveSheetComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SheetData,
    private bottomSheetRef: MatBottomSheetRef<RemoveSheetComponent>
  ) {}

  ngOnInit(): void {}

  removeHandler() {
    const {entity, id} = this.data;

    const heroRepository = getRepository(entity);
    heroRepository.delete(id)
      .then(() => {
        this.document.location.href = `http://localhost:4200/#/dashboard`;
      });
  }

  cancelHandler() {
    this.bottomSheetRef.dismiss();
    // event.preventDefault();
  }
}
