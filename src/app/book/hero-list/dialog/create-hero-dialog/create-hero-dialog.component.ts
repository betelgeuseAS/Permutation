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
  fileToUpload: Filepond.File = null;
  fileBase64ToUpload: string;

  pondOptions = this.filepondService.getOptions({
    allowImagePreview: true,
    imageCropAspectRatio: '16:10',
    acceptedFileTypes: ['image/jpg', 'image/jpeg', 'image/png']
  });
  pondFiles = this.filepondService.getFiles();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private filepondService: FilepondService
  ) {}

  ngOnInit(): void {}

  pondHandleInit() {
    // console.log('FilePond has initialised');
  }

  pondHandleAddFile(event: any) {
    this.fileToUpload = event.file;
    this.fileBase64ToUpload = event.file.getFileEncodeDataURL();
  }

  poundHandleRemoveFile(event: any) {
    this.fileToUpload = undefined;
    this.fileBase64ToUpload = undefined;
  }

  getResult(): object {
    return {
      fileToUpload: this.fileToUpload,
      fileBase64ToUpload: this.fileBase64ToUpload
    };
  }
}
