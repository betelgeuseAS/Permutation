import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../data-access/entities/book.entity';
import { DatabaseService } from '../data-access/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBookDialogComponent } from '../dialogs/update-book-dialog/update-book-dialog.component';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  id: number;
  form: FormGroup;
  book: Book;
  private subscription: Subscription;
  panelOpenState = false;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.bookId);

    this.getBookById(this.id);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  getBookById(bookId) {
    this.databaseService
      .connection
      .then(() => Book.findOne({ where: {id: bookId},  relations: ['heroes'/*, 'heroes.imagePreview'*/] }))
      .then(book => {
        this.book = book;

        this.updateBookBreadcrumb();
      });

    // let book = await repository.createQueryBuilder('book')
    //   .innerJoinAndSelect('book.heroes', 'heroes')
    //   .innerJoinAndSelect('heroes.imagePreview', 'imagePreview')
    //   .getMany();
  }

  updateBook() {
    if (this.form.valid) {
      let {name, description} = this.form.value;
      const book = this.book;

      book.name = name;
      book.description = description;

      this.databaseService
        .connection
        .then(() => book.save())
        .then(() => {
          this.getBookById(this.id);
        })
        .then(() => {
          name = '';
          description = '';
        });

      this.dialog.closeAll();
    }
  }

  updateBookBreadcrumb() {
    // this.ngDynamicBreadcrumbService.updateBreadcrumbLabels({
    //   bookBreadcrumb: this.book.name
    // });

    this.ngDynamicBreadcrumbService.updateBreadcrumb([
      {
        label: 'Dashboard',
        url: 'dashboard'
      },
      {
        label: this.book.name,
        url: ''
      }
    ]);
  }

  openUpdateBookDialog() {
    const {name, description} = this.book;
    this.form.controls.name.setValue(name);
    this.form.controls.description.setValue(description);

    const dialogRef = this.dialog.open(UpdateBookDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBook();
      }

      this.form.reset();
    });
  }
}
