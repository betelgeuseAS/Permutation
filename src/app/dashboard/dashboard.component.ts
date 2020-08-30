import { Component, OnInit } from '@angular/core';
import { Book } from '../data-access/entities/book.entity';
import { DatabaseService } from '../data-access/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(
    private databaseService: DatabaseService
  ) {
    this.getBooks();
  }

  ngOnInit(): void {}

  getBooks() {
    this.databaseService
      .connection
      .then(() => Book.find({order: {position: 'ASC'}, relations: ['heroes']})) // { select: ['id', 'name'] } or get with relations: .find({relations: ['heroes']}) or .find({ select: ['id', 'name'], relations: ['heroes'] })
      .then(books => {
        this.books = books;
      });
  }
}
