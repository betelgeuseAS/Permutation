import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { Hero } from '../../data-access/entities/hero.entity';
import { ImageHero } from '../../data-access/entities/image-hero.entity';
import { DatabaseService } from '../../data-access/database.service';

import { MyValidators } from '../../shared/validators/my.validators';

import { MatDialog } from '@angular/material/dialog';
import { CreateHeroDialogComponent } from './dialog/create-hero-dialog/create-hero-dialog.component';

import * as moment from 'moment';
import * as Filepond from 'filepond';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.sass'],
  providers: []
})
export class HeroListComponent implements OnInit {

  @Input() book: Book;
  form: FormGroup;
  fileToUploadGallery: Filepond.File[] = [];
  fileBase64ToUploadGallery: Array<string> = [];
  heroes: Hero[] = [];

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(CreateHeroDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileToUploadGallery = result.fileToUploadGallery;
        this.fileBase64ToUploadGallery = result.fileBase64ToUploadGallery;

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

      if (this.fileToUploadGallery) {
        this.fileToUploadGallery.forEach((item, index) => {
          const {filename, fileType, fileSize} = item;

          const imageHero = new ImageHero();
          imageHero.name = filename;
          imageHero.data = this.fileBase64ToUploadGallery[index];
          imageHero.mimeType = fileType;
          imageHero.size = fileSize;
          imageHero.hero = hero;

          this.databaseService
            .connection
            .then(() => imageHero.save());

          hero.images.push(imageHero);
        });
      }

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.getHeroesByBookId(this.book.id);
        })
        .then(() => {
          name = '';

          this.fileToUploadGallery = undefined;
        });
    }

    this.dialog.closeAll();
  }
}
