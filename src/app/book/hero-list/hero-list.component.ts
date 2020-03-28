import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Hero } from '../../data-access/entities/hero.entity';
import { DatabaseService } from '../../data-access/database.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../data-access/entities/book.entity';

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
  heroes: Hero[] = [];

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
      name: new FormControl('', Validators.required),
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
    this.databaseService
      .connection
      .then(() => Hero.find({relations: ['book']}))
      .then(heroes => {
        this.heroes = heroes;
      });
  }

  createHero() {
    if (this.form.valid) {
      let {name, description} = this.form.value;
      const hero = new Hero();

      hero.name = name;
      hero.description = description;
      // hero.book = book: Book;

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.getHeroes();
        })
        .then(() => {
          name = '';
          description = '';

          this.closeCreateHeroModal();
        });
    }
  }
}
