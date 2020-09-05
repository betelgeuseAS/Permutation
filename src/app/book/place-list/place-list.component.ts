import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { Place } from '../../data-access/entities/place.entity';
import { DatabaseService } from '../../data-access/database.service';

import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../../dialogs/create-dialog/create-dialog.component';

import * as moment from 'moment';

import { RemoveSheetComponent } from '../../dialogs/remove-sheet/remove-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.sass'],
  providers: []
})
export class PlaceListComponent implements OnInit {

  @Input() book: Book;

  form: FormGroup;

  places: Place[] = [];

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  openCreatePlaceDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createPlace();
      }

      this.form.reset();
    });
  }

  getPlacesByBookId(bookId) {
    this.databaseService
      .connection
      .then(() => Place.find({ where: {book: {id: bookId}},  relations: ['book'] }))
      .then(places => {
        this.book.places = places;
      });
  }

  createPlace() {
    if (this.form.valid) {
      let {name} = this.form.value;
      const place = new Place();

      place.name = name;
      place.created = moment().format('YYYY-MM-DD H:mm:ss');
      place.book = this.book;

      this.databaseService
        .connection
        .then(() => place.save())
        .then(() => {
          this.getPlacesByBookId(this.book.id);
        })
        .then(() => {
          name = '';
        });
    }

    this.dialog.closeAll();
  }

  removePlaceSheet(place: Place): void {
    const bottomSheetRef = this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Place,
        item: place
      }
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.getPlacesByBookId(this.book.id);
    });
  }
}
