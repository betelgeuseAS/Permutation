import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../data-access/entities/hero.entity';
import { KsGalleryService, KsOwnImage } from '../../../shared/services/ks-modal-gallery/ks-gallery.service';
import { Image } from '@ks89/angular-modal-gallery';
import { ImageHero } from '../../../data-access/entities/image-hero.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FilepondService } from '../../../shared/services/filepond.service';
import * as Filepond from 'filepond';
import { ImageHeroPreview } from '../../../data-access/entities/image-hero-preview.entity';
import { TinyMCEService } from '../../../shared/services/tinymce.service';

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

  pondOptionsGallery: Filepond.FilePondOptionProps = this.filepondService.getOptions({
    allowMultiple: true,
    maxFiles: 10,
    allowImagePreview: true,
    imageCropAspectRatio: '16:10',
    acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png']
  });
  pondFilesGallery = this.filepondService.getFiles();

  pondOptionsPreview: Filepond.FilePondOptionProps = this.filepondService.getOptions({
    allowImagePreview: true,
    imageCropAspectRatio: '16:10',
    acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png']
  });
  pondFilesPreview = this.filepondService.getFiles();

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

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private filepondService: FilepondService,
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    public ksGalleryService: KsGalleryService,
    public tinyMCEService: TinyMCEService
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

      this.closeUpdateHeroModal();
    }
  }

  openUpdateHeroModal(content) {
    const {name, description} = this.hero;
    this.form.controls.name.setValue(name);
    this.form.controls.description.setValue(description);

    this.modalService.open(content, { size: 'lg' });
  }

  closeUpdateHeroModal() {
    this.fileToUploadGallery = [];
    this.fileToUploadPreview = null;
    this.form.reset();
    this.modalService.dismissAll('Close update hero.');
  }

  pondHandleAddFileGallery(event: any) {
    this.fileToUploadGallery.push(event.file);

    const base64StringDataURL = event.file.getFileEncodeDataURL();
    // const base64String = event.file.getFileEncodeBase64String();
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

  pondHandleAddFilePreview(event: any) {
    this.fileToUploadPreview = event.file;
    this.fileBase64ToUploadPreview = event.file.getFileEncodeDataURL();
  }

  poundHandleRemoveFilePreview(event: any) {
    this.fileToUploadPreview = null;
    this.fileBase64ToUploadPreview = null;
  }
}
