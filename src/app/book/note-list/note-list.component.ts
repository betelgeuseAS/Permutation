import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../../dialogs/create-dialog/create-dialog.component';
import * as moment from 'moment';
import { RemoveSheetComponent } from '../../dialogs/remove-sheet/remove-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Note } from '../../data-access/entities/note.entity';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.sass'],
  providers: []
})
export class NoteListComponent implements OnInit {

  @Input() book: Book;
  form: FormGroup;
  notes: Note[] = [];

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

  openCreateNoteDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNote();
      }

      this.form.reset();
    });
  }

  getNotesByBookId(bookId) {
    this.databaseService
      .connection
      .then(() => Note.find({ where: {book: {id: bookId}},  relations: ['book'] }))
      .then(notes => {
        this.book.notes = notes;
      });
  }

  createNote() {
    if (this.form.valid) {
      let {name} = this.form.value;
      const note = new Note();

      note.name = name;
      note.created = moment().format('YYYY-MM-DD H:mm:ss');
      note.book = this.book;

      this.databaseService
        .connection
        .then(() => note.save())
        .then(() => {
          this.getNotesByBookId(this.book.id);
        })
        .then(() => {
          name = '';
        });
    }

    this.dialog.closeAll();
  }

  removeNoteSheet(note: Note): void {
    const bottomSheetRef = this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Note,
        item: note
      }
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.getNotesByBookId(this.book.id);
    });
  }
}
