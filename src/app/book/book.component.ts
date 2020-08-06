import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../data-access/entities/book.entity';
import { DatabaseService } from '../data-access/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { getRepository } from 'typeorm';
import { DOCUMENT } from '@angular/common';
import { QuillEditorComponent } from 'ngx-quill';
import { QuillService } from '../shared/services/quill/quill.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  bookId: number;
  form: FormGroup;
  book: Book;
  private subscription: Subscription;

  @ViewChild(QuillEditorComponent, { static: true }) quillEditor: QuillEditorComponent;
  quillModules: object;
  quillContent: string | null;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    @Inject(DOCUMENT) private document: Document,
    public quillService: QuillService
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.bookId = params.bookId);

    this.getBookById(this.bookId);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    this.quillModules = this.quillService.getModule({
      quillEditor: this.quillEditor,
      matModal: this.dialog
    });
  }

  getBookById(bookId) {
    this.databaseService
      .connection
      .then(() => Book.findOne({ where: {id: bookId},  relations: ['heroes'/*, 'heroes.imagePreview'*/] }))
      .then(book => {
        this.book = book;

        this.form.controls.name.setValue(this.book.name);

        this.quillContent = this.book.content;

        this.updateBookBreadcrumb();
      });

    // let book = await repository.createQueryBuilder('book')
    //   .innerJoinAndSelect('book.heroes', 'heroes')
    //   .innerJoinAndSelect('heroes.imagePreview', 'imagePreview')
    //   .getMany();
  }

  updateBookHandler() {
    if (this.form.valid) {
      const {name} = this.form.value;
      const book = this.book;

      book.name = name;
      book.content = this.quillContent;

      this.databaseService
        .connection
        .then(() => book.save())
        .then(() => {
          this.getBookById(this.bookId);
        })
        .then(() => {
          // name = '';
        });

      this.dialog.closeAll();
    }
  }

  removeBookHandler() {
    const heroRepository = getRepository(Book);
    heroRepository.delete(this.book.id)
      .then(() => {
        this.document.location.href = `http://localhost:4200/#/dashboard`;
      });
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
}
