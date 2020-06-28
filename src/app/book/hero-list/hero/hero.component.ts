import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../data-access/entities/hero.entity';
import { KsGalleryService, KsOwnImage } from '../../../shared/services/ks-modal-gallery/ks-gallery.service';
import { Image } from '@ks89/angular-modal-gallery';
import { ImageHero } from '../../../data-access/entities/image-hero.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Filepond from 'filepond';
import { Track } from 'ngx-audio-player';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';
import { QuillService } from '../../../shared/services/quill/quill.service';
import { QuillEditorComponent } from 'ngx-quill';
import { FilepondService } from '../../../shared/services/filepond.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {

  form: FormGroup;
  id: number;
  hero: Hero;
  images: Image[] = [];
  fileToUploadGallery: Filepond.File[] = [];
  fileBase64ToUploadGallery: Array<string> = [];
  private subscription: Subscription;

  pondOptionsGallery: Filepond.FilePondOptionProps = this.filepondService.getOptions({
    allowMultiple: true,
    maxFiles: 10,
    allowImagePreview: true,
    imageCropAspectRatio: '16:10',
    acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png']
  });
  pondFilesGallery = this.filepondService.getFiles();

  playlist: Track[] = [];
  displayTitle = this.audioPlayerService.getOptions().displayTitle;
  displayPlayList = this.audioPlayerService.getOptions().displayPlayList;
  pageSizeOptions = this.audioPlayerService.getOptions().pageSizeOptions;
  displayVolumeControls = this.audioPlayerService.getOptions().displayVolumeControls;

  @ViewChild(QuillEditorComponent, { static: true }) quillEditor: QuillEditorComponent;
  quillModules: object;
  QuillContent: string | null;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

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
      .then(() => Hero.findOne({ where: {id: heroId},  relations: ['images'] }))
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

        // this.playlist = [
        //   {
        //     title: 'Title',
        //     link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        //   }
        // ];

        this.QuillContent = this.hero.content;
      });
  }

  updateHeroHandler() {
    if (this.form.valid) {
      const {name} = this.form.value;
      const hero = this.hero;

      hero.name = name;

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
          this.getHeroById(this.id);
        })
        .then(() => {
          this.fileToUploadGallery = [];
          this.fileBase64ToUploadGallery = [];
          // this.form.reset();

          this.snackBar.open('Hero Updated', 'Close', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
  }

  pondHandleAddFileGallery(event: any) {
    this.fileToUploadGallery.push(event.file);
    const base64StringDataURL = event.file.getFileEncodeDataURL();
    this.fileBase64ToUploadGallery.push(base64StringDataURL);
  }

  poundHandleRemoveFileGallery(event: any) {
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
}
