import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { getRepository } from 'typeorm';
import { Book } from '../../data-access/entities/book.entity';
import { DOCUMENT } from '@angular/common';

interface SheetData {
  entity: any;
  item: any;
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
    const {entity, item} = this.data;

    if (!item) {
      return;
    }

    const heroRepository = getRepository(entity);
    heroRepository.delete(item.id)
      .then(() => {
        switch (entity.name) {
          case 'Book':
            this.document.location.href = `http://localhost:4200/#/dashboard`;
            break;
          case 'Hero':
            this.document.location.href = `http://localhost:4200/#/book/${item.book.id}`;
            break;
          case 'Note':
            this.document.location.href = `http://localhost:4200/#/book/${item.book.id}`;
            break;
        }
      });
  }

  cancelHandler() {
    this.bottomSheetRef.dismiss();
    // event.preventDefault();
  }
}
