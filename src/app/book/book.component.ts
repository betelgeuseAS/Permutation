import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../data-access/entities/book.entity';
import { DatabaseService } from '../data-access/database.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  id: number;
  book: Book;
  private subscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);

    this.getBookById(this.id);
  }

  ngOnInit(): void {}

  async getBookById(bookId) {
    await this.databaseService
      .connection
      .then(() => Book.findOne({ where: {id: bookId},  relations: ['heroes'] }))
      .then(book => {
        this.book = book;
      });
  }
}
