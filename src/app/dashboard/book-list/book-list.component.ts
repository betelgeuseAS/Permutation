import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface BookInterface {
  id?: number;
  name: string;
  description: string;
  position?: number;
}

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

  name = '';
  description = '';

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private databaseService: DatabaseService
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

  getBooks() {
    this.databaseService
      .connection
      .then(() => Book.find())
      .then(books => {
        this.books = books;
      });
  }

  createBook() {
    if (this.form.valid) {
      const book = new Book();

      book.name = this.name;
      book.description = this.description;

      this.databaseService
        .connection
        .then(() => book.save())
        .then(() => {
          this.getBooks();
        })
        .then(() => {
          this.name = '';
          this.description = '';
        });
    }
  }
}
