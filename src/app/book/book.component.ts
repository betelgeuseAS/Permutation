import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../data-access/entities/book.entity';
import { DatabaseService } from '../data-access/database.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ImageHero} from '../data-access/entities/image-hero.entity';
import {ImageHeroPreview} from '../data-access/entities/image-hero-preview.entity';

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

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);

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
      .then(() => Book.findOne({ where: {id: bookId},  relations: ['heroes', 'heroes.imagePreview'] }))
      .then(book => {
        this.book = book;
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

      this.closeUpdateBookModal();
    }
  }

  openUpdateBookModal(content) {
    const {name, description} = this.book;
    this.form.controls.name.setValue(name);
    this.form.controls.description.setValue(description);

    this.modalService.open(content, { size: 'lg' });
  }

  closeUpdateBookModal() {
    this.form.reset();
    this.modalService.dismissAll('Close update book.');
  }
}
