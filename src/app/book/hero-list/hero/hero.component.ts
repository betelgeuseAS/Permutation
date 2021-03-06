import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../data-access/entities/hero.entity';
import { KsGalleryService } from '../../../shared/services/ks-modal-gallery/ks-gallery.service';
import { ButtonEvent, Image } from '@ks89/angular-modal-gallery';
import { ImageHero } from '../../../data-access/entities/image-hero.entity';
import { AudioHero } from '../../../data-access/entities/audio-hero.entity';
import { getRepository } from 'typeorm';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as Filepond from 'filepond';
// import * as moment from 'moment';
// import { Track } from 'ngx-audio-player';
import * as _ from 'lodash'; // or import 'lodash'; declare var _:any; // or import * as _isEmpty from 'lodash/isEmpty';
import { AudioPlayerService, PlayerOwnAudio } from '../../../shared/services/audio-player.service';
import { QuillService } from '../../../shared/services/quill/quill.service';
import { QuillEditorComponent } from 'ngx-quill';
import { FilepondService } from '../../../shared/services/filepond.service';
import { AudioRecorderComponent } from '../../../shared/components/audio-recorder/audio-recorder.component';
import { DOCUMENT } from '@angular/common';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { RemoveSheetComponent } from '../../../dialogs/remove-sheet/remove-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {ToastService} from 'angular-toastify';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {

  id: number;
  hero: Hero;

  form: FormGroup;
  images: Image[] = [];

  fileToUploadGallery: Filepond.File[] = [];
  fileBase64ToUploadGallery: Array<string> = [];
  pondOptionsGallery: Filepond.FilePondOptionProps = this.filepondService.getOptions({
    allowMultiple: true,
    maxFiles: 10,
    allowImagePreview: true,
    imageCropAspectRatio: '16:10',
    acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png']
  });
  pondFilesGallery = this.filepondService.getFiles();

  playlistBasic: PlayerOwnAudio[] = [];
  displayTitleBasic = this.audioPlayerService.getOptionsBasic().displayTitle;
  displayVolumeControlsBasic = this.audioPlayerService.getOptionsBasic().displayVolumeControls;

  @ViewChild(QuillEditorComponent, { static: true }) quillEditor: QuillEditorComponent;
  quillModules: object;
  quillContent: string | null;

  @ViewChild(AudioRecorderComponent, { static: true }) audioRecorder: AudioRecorderComponent;

  private subscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    private filepondService: FilepondService,
    public ksGalleryService: KsGalleryService,
    public audioPlayerService: AudioPlayerService,
    public quillService: QuillService,
    @Inject(DOCUMENT) private document: Document,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private bottomSheet: MatBottomSheet,
    private toastService: ToastService
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.heroId);

    this.getHeroById(this.id);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.quillModules = this.quillService.getModule({
      quillEditor: this.quillEditor
    });
  }

  getHeroById(heroId) {
    this.databaseService
      .connection
      .then(() => Hero.findOne({ where: {id: heroId},  relations: ['images', 'audios'] }))
      .then(hero => {
        this.hero = hero;

        this.updateHeroBreadcrumb();

        this.form.controls.name.setValue(this.hero.name);

        const img: ImageHero[] = [...this.hero.images];
        this.images = this.ksGalleryService.getImages(img);

        // if (this.hero.imagePreview) {
        //   this.pondFilesPreview.push(this.hero.imagePreview.data); // Will be call onaddfile filepond method.
        // }

        // if (this.hero.images) {
        //   this.pondFilesGallery = this.hero.images.map(item => {
        //     return item.data;
        //   });
        // }

        this.playlistBasic = this.audioPlayerService.getAudios(this.hero.audios);

        this.quillContent = this.hero.content;
      });
  }

  updateHeroHandler() {
    if (this.form.valid) {
      const {name} = this.form.value;
      const hero = this.hero;

      hero.name = name;
      hero.content = this.quillContent;

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

      if (this.audioRecorder.fileToUploadAudio) {
        this.audioRecorder.fileToUploadAudio.forEach((item, index) => {
          const {type, size} = item;

          const audioHero = new AudioHero();
          audioHero.name = this.audioRecorder.form.value.audioFields[index].title;
          audioHero.data = this.audioRecorder.fileBase64ToUploadAudio[index];
          audioHero.mimeType = type; // 'audio/wav'
          audioHero.size = size;
          audioHero.hero = hero;

          this.databaseService
            .connection
            .then(() => audioHero.save());

          hero.audios.push(audioHero);
        });
      }

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.pondFilesGallery = [];
          this.fileToUploadGallery = [];
          this.fileBase64ToUploadGallery = [];

          this.audioRecorder.form.reset();
          (this.audioRecorder.form.controls.audioFields as FormArray).clear();
          this.audioRecorder.playlistBasic = [];
          this.audioRecorder.fileToUploadAudio = [];
          this.audioRecorder.fileBase64ToUploadAudio = [];

          // this.form.reset();

          this.getHeroById(this.id);
        })
        .then(() => {
          // name = '';

          this.toastService.success('Hero successfully updated');
        })
        .catch((error) => {
          this.toastService.warn('Unable to update Hero');
        });
    }
  }

  updateHeroBreadcrumb() {
    // this.ngDynamicBreadcrumbService.updateBreadcrumbLabels({
    //   bookBreadcrumb: this.hero.book.name,
    //   heroBreadcrumb: this.hero.name
    // });

    this.ngDynamicBreadcrumbService.updateBreadcrumb([
      {
        label: 'Dashboard',
        url: 'dashboard'
      },
      {
        label: this.hero.book.name,
        url: 'book/:bookId'
      },
      {
        label: this.hero.name,
        url: ''
      }
    ]);
  }

  removeHeroSheet(): void {
    this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Hero,
        item: this.hero
      }
    });
  }

  pondHandleAddFileGallery(event: any) {
    this.fileToUploadGallery.push(event.file);
    const base64StringDataURL = event.file.getFileEncodeDataURL();
    this.fileBase64ToUploadGallery.push(base64StringDataURL);
  }

  pondHandleRemoveFileGallery(event: any) {
    const index = this.fileToUploadGallery.findIndex((item) => {
      return item.id === event.file.id;
    });

    if (index > -1) {
      this.fileToUploadGallery.splice(index, 1);
      this.fileBase64ToUploadGallery.splice(index, 1);
    }
  }

  removeImage(event: ButtonEvent) {
    if (event.button && event.button.type === 1) { // click on remove button
      const imageHeroRepository = getRepository(ImageHero);
      imageHeroRepository.delete(event.image.id) // .remove(imageHero)
        .then(() => {
          this.getHeroById(this.hero.id);
        });
    }
  }

  removeRecord(id) {
    const audioHero = _.find(this.hero.audios, o => o.id = id);

    if (audioHero) {
      const audioHeroRepository = getRepository(AudioHero);
      audioHeroRepository.delete(id) // .remove(audioHero)
        .then(() => {
          this.getHeroById(this.hero.id);
        });
    }
  }
}
