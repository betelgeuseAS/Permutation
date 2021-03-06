import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { Hero } from '../../data-access/entities/hero.entity';
import { DatabaseService } from '../../data-access/database.service';

import { MyValidators } from '../../shared/validators/my.validators';

import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../../dialogs/create-dialog/create-dialog.component';

import * as moment from 'moment';
import { RemoveSheetComponent } from '../../dialogs/remove-sheet/remove-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.sass'],
  providers: []
})
export class HeroListComponent implements OnInit {

  @Input() book: Book;
  form: FormGroup;
  heroes: Hero[] = [];

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      file: new FormControl('', MyValidators.imageType)
    });

    // Here we can get data from @Input.
    // this.getHeroesByBookId(this.book.id);
  }

  openCreateHeroDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createHero();
      }

      this.form.reset();
    });
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
      let {name} = this.form.value;
      const hero = new Hero();

      hero.name = name;
      hero.created = moment().format('YYYY-MM-DD H:mm:ss');
      hero.book = this.book;

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.getHeroesByBookId(this.book.id);
        })
        .then(() => {
          name = '';
        });
    }

    this.dialog.closeAll();
  }

  removeHeroSheet(hero: Hero): void {
    const bottomSheetRef = this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Hero,
        item: hero
      }
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.getHeroesByBookId(this.book.id);
    });
  }
}
