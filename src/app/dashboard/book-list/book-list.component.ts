import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';

import { DragAndDropService } from '../../shared/services/drag-and-drop.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.sass'],
  providers: [
    NgbModalConfig,
    NgbModal
  ]
})
export class BookListComponent implements OnInit {

  form: FormGroup;
  books: Book[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private databaseService: DatabaseService,
    private dragAndDropService: DragAndDropService
  ) {
    // Customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    this.getBooks();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', Validators.required)
    });
  }

  openCreateBookModal(content) {
    this.modalService.open(content, { size: 'lg'/*, centered: true*/ });
  }

  closeCreateBookModal() {
    this.form.reset();
    this.modalService.dismissAll('Close create book.');
  }

  getBooks() {
    this.databaseService
      .connection
      .then(() => Book.find({order: {position: 'ASC'}})) // { select: ['id', 'name'] } or get with relations: .find({relations: ['heroes']}) or .find({ select: ['id', 'name'], relations: ['heroes'] })
      .then(books => {
        this.books = books;
      });
  }

  createBook() {
    if (this.form.valid) {
      let {name, description} = this.form.value;
      const book = new Book();

      book.name = name;
      book.description = description;
      book.created = moment().format('YYYY-MM-DD H:mm:ss');

      this.databaseService
        .connection
        .then(() => book.save())
        .then(() => {
          this.getBooks();
        })
        .then(() => {
          name = '';
          description = '';

          this.closeCreateBookModal();
        });
    }
  }

  dragDropEntities(event: CdkDragDrop<string[]>) {
    this.dragAndDropService.dragDropEntities(event, this.books);
  }
}
