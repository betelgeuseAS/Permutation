import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './info-quill-dialog.component.html',
  styleUrls: ['./info-quill-dialog.component.sass']
})
export class InfoQuillDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: object) {}

  ngOnInit(): void {}
}
