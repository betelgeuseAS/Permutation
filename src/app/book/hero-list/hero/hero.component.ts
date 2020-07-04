import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../data-access/entities/hero.entity';
import { KsGalleryService, KsOwnImage } from '../../../shared/services/ks-modal-gallery/ks-gallery.service';
import { Image } from '@ks89/angular-modal-gallery';
import { ImageHero } from '../../../data-access/entities/image-hero.entity';
import { AudioHero } from '../../../data-access/entities/audio-hero.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Filepond from 'filepond';
// import { Track } from 'ngx-audio-player';
import { AudioPlayerService, PlayerOwnAudio } from '../../../shared/services/audio-player.service';
import { QuillService } from '../../../shared/services/quill/quill.service';
import { QuillEditorComponent } from 'ngx-quill';
import { FilepondService } from '../../../shared/services/filepond.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as moment from 'moment';

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

  playlistAdvanced: PlayerOwnAudio[] = []; // Track[]
  displayTitleAdvanced = this.audioPlayerService.getOptionsAdvanced().displayTitle;
  displayPlayListAdvanced = this.audioPlayerService.getOptionsAdvanced().displayPlayList;
  pageSizeOptionsAdvanced = this.audioPlayerService.getOptionsAdvanced().pageSizeOptions;
  displayVolumeControlsAdvanced = this.audioPlayerService.getOptionsAdvanced().displayVolumeControls;

  fileToUploadAudio: Array<Blob> = [];
  fileBase64ToUploadAudio: Array<string> = [];

  @ViewChild(QuillEditorComponent, { static: true }) quillEditor: QuillEditorComponent;
  quillModules: object;
  quillContent: string | null;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  private subscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    private filepondService: FilepondService,
    public ksGalleryService: KsGalleryService,
    public audioPlayerService: AudioPlayerService,
    public quillService: QuillService,
    private snackBar: MatSnackBar
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.id);

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

        this.form.controls.name.setValue(this.hero.name);

        const img: Array<KsOwnImage> = [...this.hero.images];
        this.images = this.ksGalleryService.getImages(img);

        // if (this.hero.imagePreview) {
        //   this.pondFilesPreview.push(this.hero.imagePreview.data); // Will be call onaddfile filepond method.
        // }

        // if (this.hero.images) {
        //   this.pondFilesGallery = this.hero.images.map(item => {
        //     return item.data;
        //   });
        // }

        this.playlistAdvanced = this.audioPlayerService.getAudios(this.hero.audios);

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

      if (this.fileToUploadAudio) {
        this.fileToUploadAudio.forEach((item, index) => {
          const {type, size} = item;

          const audioHero = new AudioHero();
          audioHero.name = moment().format('ll');
          audioHero.data = this.fileBase64ToUploadAudio[index];
          audioHero.mimeType = type; // 'audio/wav'
          audioHero.size = size;
          audioHero.hero = hero;

          this.databaseService
            .connection
            .then(() => audioHero.save());

          hero.images.push(audioHero);
        });
      }

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.pondFilesGallery = [];
          this.fileToUploadGallery = [];
          this.fileBase64ToUploadGallery = [];

          this.fileToUploadAudio = [];
          this.fileBase64ToUploadAudio = [];

          // this.form.reset();

          this.snackBar.open('Hero Updated', 'Close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });

          this.getHeroById(this.id);
        });
    }
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

  handelPlayerEnded($event) {
    // console.log($event);
  }

  addAudioHandler(data: {blob: Blob; base64: string}) {
    this.fileToUploadAudio.push(data.blob);
    this.fileBase64ToUploadAudio.push(data.base64);
  }
}
