import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.sass'],
  providers: [
    NgbModalConfig,
    NgbModal
  ]
})
export class HeroListComponent implements OnInit {

  form: FormGroup;
  heroes: Book[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private databaseService: DatabaseService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.getHeroes();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', Validators.required)
    });
  }

  openCreateHeroModal(content) {
    this.modalService.open(content, { size: 'lg'/*, centered: true*/ });
  }

  closeCreateHeroModal() {
    this.form.reset();
    this.modalService.dismissAll('Close create book.');
  }

  getHeroes() {
    // this.databaseService
    //   .connection
    //   .then(() => Book.find())
    //   .then(books => {
    //     this.books = books;
    //   });
  }

  createHero() {
    // if (this.form.valid) {
    //   let {name, description} = this.form.value;
    //   const book = new Book();
    //
    //   book.name = name;
    //   book.description = description;
    //
    //   this.databaseService
    //     .connection
    //     .then(() => book.save())
    //     .then(() => {
    //       this.getBooks();
    //     })
    //     .then(() => {
    //       name = '';
    //       description = '';
    //     });
    // }
  }
}
