import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../../data-access/entities/book.entity';
import { Hero } from '../../data-access/entities/hero.entity';
import { ImageHeroPreview } from '../../data-access/entities/image-hero-preview.entity';
import { DatabaseService } from '../../data-access/database.service';

import { DragAndDropService } from '../../shared/services/drag-and-drop.service';

import { MyValidators } from '../../shared/validators/my.validators';

import * as moment from 'moment';

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
  fileToUpload: File = null;
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
      description: new FormControl('', Validators.required),
      file: new FormControl('', MyValidators.imageType)
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
        const reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);

        reader.onload = () => {
          const imageHeroPreview = new ImageHeroPreview();
          imageHeroPreview.name = this.fileToUpload.name;

          // Convert Image To Base64 string.
          // img to base64: https://www.base64-image.de/
          // base64 to img: https://codebeautify.org/base64-to-image-converter
          imageHeroPreview.data = typeof reader.result === 'string' ? reader.result : Buffer.from(reader.result).toString();

          imageHeroPreview.mimeType = this.fileToUpload.type;
          imageHeroPreview.size = this.fileToUpload.size;

          hero.imagePreview = imageHeroPreview;

          this.databaseService
            .connection
            .then(() => hero.save())
            .then(() => {
              this.getHeroesByBookId(this.book.id);
            })
            .then(() => {
              name = '';
              description = '';

              imageHeroPreview.name = '';
              imageHeroPreview.data = '';
              imageHeroPreview.mimeType = '';
              imageHeroPreview.size = 0;

              this.fileToUpload = null;
            });
        };

        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      } else {
        this.databaseService
          .connection
          .then(() => hero.save())
          .then(() => {
            this.getHeroesByBookId(this.book.id);
          })
          .then(() => {
            name = '';
            description = '';
          });
      }
    }

    this.closeCreateHeroModal();
  }

  dragDropEntities(event: CdkDragDrop<string[]>) {
    this.dragAndDropService.dragDropEntities(event, this.heroes);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
