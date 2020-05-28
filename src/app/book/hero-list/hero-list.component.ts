import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { Hero } from '../../data-access/entities/hero.entity';
import { ImageHeroPreview } from '../../data-access/entities/image-hero-preview.entity';
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
  fileToUpload: Filepond.File = null;
  fileBase64ToUpload: string;
  heroes: Hero[] = [];

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
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
        this.fileToUpload = result.fileToUpload;
        this.fileBase64ToUpload = result.fileBase64ToUpload;

        this.createHero();
      }

      this.form.reset();
    });
  }

  getHeroesByBookId(bookId) {
    this.databaseService
      .connection
      .then(() => Hero.find({ where: {book: {id: bookId}},  relations: ['book', 'imagePreview'] }))
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
      hero.created = moment().format('YYYY-MM-DD H:mm:ss');
      hero.book = this.book;

      if (this.fileToUpload) {
        const {filename, fileType, fileSize} = this.fileToUpload;

        const imageHeroPreview = new ImageHeroPreview();
        imageHeroPreview.name = filename;

        // img to base64: https://www.base64-image.de/
        // base64 to img: https://codebeautify.org/base64-to-image-converter
        imageHeroPreview.data = this.fileBase64ToUpload;

        imageHeroPreview.mimeType = fileType;
        imageHeroPreview.size = fileSize;

        hero.imagePreview = imageHeroPreview;
      }

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.getHeroesByBookId(this.book.id);
        })
        .then(() => {
          name = '';
          description = '';

          this.fileToUpload = undefined;
        });
    }

    this.dialog.closeAll();
  }
}
