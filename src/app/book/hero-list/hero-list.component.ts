import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../../data-access/entities/book.entity';
import { Hero } from '../../data-access/entities/hero.entity';
import { DatabaseService } from '../../data-access/database.service';

import {DragAndDropService} from '../../shared/services/drag-and-drop.service';

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

  @Input() book: Book;

  form: FormGroup;
  heroes: Hero[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private databaseService: DatabaseService,
    private dragAndDropService: DragAndDropService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    // Here we can get data from @Input.
    // this.getHeroesByBookId(this.book.id);
  }

  openCreateHeroModal(content) {
    this.modalService.open(content, { size: 'lg'/*, centered: true*/ });
  }

  closeCreateHeroModal() {
    this.form.reset();
    this.modalService.dismissAll('Close create book.');
  }

  getHeroesByBookId(bookId) {
    this.databaseService
      .connection
      .then(() => Hero.find({ where: {book: {id: bookId}},  relations: ['book'] }))
      .then(heroes => {
        this.book.heroes = heroes;
      });
  }

  createHero() {
    if (this.form.valid) {
      let {name, description} = this.form.value;
      const hero = new Hero();

      hero.name = name;
      hero.description = description;
      hero.book = this.book;

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.getHeroesByBookId(this.book.id);
        })
        .then(() => {
          name = '';
          description = '';

          this.closeCreateHeroModal();
        });
    }
  }

  dragDropEntities(event: CdkDragDrop<string[]>) {
    this.dragAndDropService.dragDropEntities(event, this.heroes);
  }
}
