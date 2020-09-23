import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

interface DialogData {
  form: FormGroup;
}

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './save-event-dialog.component.html',
  styleUrls: ['./save-event-dialog.component.sass']
})
export class SaveEventDialogComponent implements OnInit {

  form: FormGroup = this.data.form;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
