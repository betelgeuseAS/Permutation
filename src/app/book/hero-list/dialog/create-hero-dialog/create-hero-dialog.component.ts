import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FilepondService } from '../../../../shared/services/filepond.service';
import * as Filepond from 'filepond';

interface DialogData {
  form: FormGroup;
}

@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './create-hero-dialog.component.html',
  styleUrls: ['./create-hero-dialog.component.sass']
})
export class CreateHeroDialogComponent implements OnInit {

  form: FormGroup = this.data.form;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private filepondService: FilepondService
  ) {}

  ngOnInit(): void {}

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

  getResult(): object {
    return {
      fileToUploadGallery: this.fileToUploadGallery,
      fileBase64ToUploadGallery: this.fileBase64ToUploadGallery
    };
  }
}
