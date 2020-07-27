import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {}

  getResult(): object {
    return {};
  }
}
