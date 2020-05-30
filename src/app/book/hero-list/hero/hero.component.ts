import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../data-access/entities/hero.entity';
import { KsGalleryService, KsOwnImage } from '../../../shared/services/ks-modal-gallery/ks-gallery.service';
import { Image } from '@ks89/angular-modal-gallery';
import { ImageHero } from '../../../data-access/entities/image-hero.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Filepond from 'filepond';
import { ImageHeroPreview } from '../../../data-access/entities/image-hero-preview.entity';
import { TinyMCEService } from '../../../shared/services/tinymce.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateHeroDialogComponent } from './dialog/update-hero-dialog/update-hero-dialog.component';
import { Track } from 'ngx-audio-player';
import { AudioPlayerService } from '../../../shared/services/audio-player.service';

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
  fileToUploadPreview: Filepond.File;
  fileBase64ToUploadPreview: string;
  private subscription: Subscription;

  tinyMCEOptions = this.tinyMCEService.getOptions({
    templates: [
      { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',

    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',

    menu: {
      tc: {
        title: 'TinyComments',
        items: 'addcomment showcomments deleteallconversations'
      }
    },
    menubar: 'file edit view insert format tools table tc help',
    height: 600,
    contextmenu: "link image imagetools table configurepermanentpen",

    // autosave_ask_before_unload: true,
    // autosave_interval: "30s",
    // autosave_prefix: "{path}{query}-{id}-",
    // autosave_restore_when_empty: false,
    // autosave_retention: "2m",
  });

  playlist: Track[] = [];
  displayTitle = this.audioPlayerService.getOptions().displayTitle;
  displayPlayList = this.audioPlayerService.getOptions().displayPlayList;
  pageSizeOptions = this.audioPlayerService.getOptions().pageSizeOptions;
  displayVolumeControls = this.audioPlayerService.getOptions().displayVolumeControls;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    public ksGalleryService: KsGalleryService,
    public tinyMCEService: TinyMCEService,
    public audioPlayerService: AudioPlayerService,
    public dialog: MatDialog
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.id);

    this.getHeroById(this.id);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  getHeroById(heroId) {
    this.databaseService
      .connection
      .then(() => Hero.findOne({ where: {id: heroId},  relations: ['imagePreview', 'images'] }))
      .then(hero => {
        this.hero = hero;

        const img: Array<KsOwnImage> = [...this.hero.images];
        if (this.hero.imagePreview) {
          img.push(this.hero.imagePreview);
        }
        this.images = this.ksGalleryService.getImages(img);

        // if (this.hero.imagePreview) {
        //   this.pondFilesPreview.push(this.hero.imagePreview.data); // Will be call onaddfile filepond method.
        // }

        // if (this.hero.images) {
        //   this.pondFilesGallery = this.hero.images.map(item => {
        //     return item.data;
        //   });
        // }

        this.playlist = [
          // {
          //   title: 'Title',
          //   link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          // }
        ];
      });
  }

  updateHero() {
    if (this.form.valid) {
      let {name, description} = this.form.value;
      const hero = this.hero;

      hero.name = name;
      hero.description = description;

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

      if (this.fileToUploadPreview) {
        let imageHeroPreview = hero.imagePreview;
        if (!this.hero.imagePreview) {
          imageHeroPreview = new ImageHeroPreview();
        }

        const {filename, fileType, fileSize} = this.fileToUploadPreview;

        imageHeroPreview.name = filename;
        imageHeroPreview.data = this.fileBase64ToUploadPreview;
        imageHeroPreview.mimeType = fileType;
        imageHeroPreview.size = fileSize;

        hero.imagePreview = imageHeroPreview;
      }

      this.databaseService
        .connection
        .then(() => hero.save())
        .then(() => {
          this.getHeroById(this.id);
        })
        .then(() => {
          name = '';
          description = '';

          this.fileToUploadGallery = [];
          this.fileBase64ToUploadGallery = [];
        });

      this.dialog.closeAll();
    }
  }

  openUpdateHeroDialog() {
    const {name, description} = this.hero;
    this.form.controls.name.setValue(name);
    this.form.controls.description.setValue(description);

    const dialogRef = this.dialog.open(UpdateHeroDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileToUploadGallery = result.fileToUploadGallery;
        this.fileBase64ToUploadGallery = result.fileBase64ToUploadGallery;
        this.fileToUploadPreview = result.fileToUploadPreview;
        this.fileBase64ToUploadPreview = result.fileBase64ToUploadPreview;

        this.updateHero();
      }

      this.fileToUploadGallery = [];
      this.fileToUploadPreview = null;
      this.form.reset();
    });
  }

  handelPlayerEnded($event) {
    // console.log($event);
  }
}
