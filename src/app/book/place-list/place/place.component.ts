import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { KsGalleryService } from '../../../shared/services/ks-modal-gallery/ks-gallery.service';
import { ButtonEvent, Image } from '@ks89/angular-modal-gallery';
import { getRepository } from 'typeorm';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Filepond from 'filepond';
import { QuillService } from '../../../shared/services/quill/quill.service';
import { QuillEditorComponent } from 'ngx-quill';
import { FilepondService } from '../../../shared/services/filepond.service';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { RemoveSheetComponent } from '../../../dialogs/remove-sheet/remove-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ToastService } from 'angular-toastify';
import { Place } from '../../../data-access/entities/place.entity';
import { ImagePlace } from '../../../data-access/entities/image-place.entity';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit {

  id: number;
  place: Place;

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

  @ViewChild(QuillEditorComponent, { static: true }) quillEditor: QuillEditorComponent;
  quillModules: object;
  quillContent: string | null;

  private subscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    private filepondService: FilepondService,
    public ksGalleryService: KsGalleryService,
    public quillService: QuillService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private bottomSheet: MatBottomSheet,
    private toastService: ToastService
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.placeId);

    this.getPlaceById(this.id);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.quillModules = this.quillService.getModule({
      quillEditor: this.quillEditor
    });
  }

  getPlaceById(placeId) {
    this.databaseService
      .connection
      .then(() => Place.findOne({ where: {id: placeId},  relations: ['images'] }))
      .then(place => {
        this.place = place;

        this.updatePlaceBreadcrumb();

        this.form.controls.name.setValue(this.place.name);

        const img: ImagePlace[] = [...this.place.images];
        this.images = this.ksGalleryService.getImages(img);

        this.quillContent = this.place.content;
      });
  }

  updatePlaceHandler() {
    if (this.form.valid) {
      const {name} = this.form.value;
      const place = this.place;

      place.name = name;
      place.content = this.quillContent;

      if (this.fileToUploadGallery) {
        this.fileToUploadGallery.forEach((item, index) => {
          const {filename, fileType, fileSize} = item;

          const imagePlace = new ImagePlace();
          imagePlace.name = filename;
          imagePlace.data = this.fileBase64ToUploadGallery[index];
          imagePlace.mimeType = fileType;
          imagePlace.size = fileSize;
          imagePlace.place = place;

          this.databaseService
            .connection
            .then(() => imagePlace.save());

          place.images.push(imagePlace);
        });
      }

      this.databaseService
        .connection
        .then(() => place.save())
        .then(() => {
          this.pondFilesGallery = [];
          this.fileToUploadGallery = [];
          this.fileBase64ToUploadGallery = [];

          this.form.reset();

          this.getPlaceById(this.id);
        })
        .then(() => {
          this.toastService.success('Place successfully updated');
        })
        .catch((error) => {
          this.toastService.warn('Unable to update Place');
        });
    }
  }

  updatePlaceBreadcrumb() {
    this.ngDynamicBreadcrumbService.updateBreadcrumb([
      {
        label: 'Dashboard',
        url: 'dashboard'
      },
      {
        label: this.place.book.name,
        url: 'book/:bookId'
      },
      {
        label: this.place.name,
        url: ''
      }
    ]);
  }

  removePlaceSheet(): void {
    this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Place,
        item: this.place
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
    if (event.button && event.button.type === 1) {
      const imagePlaceRepository = getRepository(ImagePlace);
      imagePlaceRepository.delete(event.image.id)
        .then(() => {
          this.getPlaceById(this.place.id);
        });
    }
  }
}
