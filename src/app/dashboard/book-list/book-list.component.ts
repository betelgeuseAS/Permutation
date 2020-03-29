import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  closeCreateBookModal() {
    this.form.reset();
    this.modalService.dismissAll('Close create book.');
  }

  getBooks() {
    this.databaseService
      .connection
      .then(() => Book.find({ select: ['id', 'name'] }))
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

      this.databaseService
        .connection
        .then(() => book.save())
        .then(() => {
          this.getBooks();
        })
        .then(() => {
          name = '';
          description = '';
        });
    }
  }
}
