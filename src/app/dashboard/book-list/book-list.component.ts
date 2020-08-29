import {Component, Input, OnInit} from '@angular/core';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { CreateBookDialogComponent } from '../../dialogs/create-book-dialog/create-book-dialog.component';

import * as moment from 'moment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass'],
  providers: []
})
export class BookListComponent implements OnInit {

  form: FormGroup;
  @Input() books: Book[] = []; // books: Book[] = [];

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog
  ) {
    // this.getBooks();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      // description: new FormControl('', Validators.required)
    });
  }

  openCreateBookDialog() {
    const dialogRef = this.dialog.open(CreateBookDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createBook();
      }

      this.form.reset();
    });
  }

  getBooks() {
    this.databaseService
      .connection
      .then(() => Book.find({order: {position: 'ASC'}}))
      .then(books => {
        this.books = books;
      });
  }

  createBook() {
    if (this.form.valid) {
      let {name} = this.form.value;
      const book = new Book();

      book.name = name;
      book.created = moment().format('YYYY-MM-DD H:mm:ss');

      this.databaseService
        .connection
        .then(() => book.save())
        .then(() => {
          this.getBooks();
        })
        .then(() => {
          name = '';

          this.dialog.closeAll();
        });
    }
  }
}
