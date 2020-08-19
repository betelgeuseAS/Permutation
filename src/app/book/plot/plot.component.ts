import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';
import { MatDialog } from '@angular/material/dialog';

import { uuid } from 'uuidv4';
import * as _ from 'lodash';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.sass'],
  providers: []
})
export class PlotComponent implements OnInit {

  @Input() book: Book;
  form: FormGroup;

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      value: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }
}
