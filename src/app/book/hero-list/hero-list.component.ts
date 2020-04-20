import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../../data-access/entities/book.entity';
import { Hero } from '../../data-access/entities/hero.entity';
import { ImageHeroPreview } from '../../data-access/entities/image-hero-preview.entity';
import { DatabaseService } from '../../data-access/database.service';

import { DragAndDropService } from '../../shared/services/drag-and-drop.service';

import { MyValidators } from '../../shared/validators/my.validators';

import { FilepondService } from '../../shared/services/filepond.service';

import * as moment from 'moment';
import * as Filepond from 'filepond';

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
  fileToUpload: Filepond.File = null;
  fileBase64ToUpload: string;
  heroes: Hero[] = [];

  pondOptions = this.filepondService.getOptions({
    allowImagePreview: true,
    imageCropAspectRatio: '16:10',
    acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png']
  });
  pondFiles = this.filepondService.getFiles();

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private databaseService: DatabaseService,
    private dragAndDropService: DragAndDropService,
    private filepondService: FilepondService
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

    this.closeCreateHeroModal();
  }

  pondHandleInit() {
    console.log('FilePond has initialised');
  }

  pondHandleAddFile(event: any) {
    this.fileToUpload = event.file;
    this.fileBase64ToUpload = event.file.getFileEncodeDataURL();
  }

  poundHandleRemoveFile(event: any) {
    this.fileToUpload = undefined;
    this.fileBase64ToUpload = undefined;
  }

  dragDropEntities(event: CdkDragDrop<string[]>) {
    this.dragAndDropService.dragDropEntities(event, this.heroes);
  }
}
