import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../data-access/database.service';
import { Event } from '../../data-access/entities/event.entity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SaveEventDialogComponent } from '../../dialogs/save-event-dialog/save-event-dialog.component';
import { RemoveAllSheetComponent } from '../../dialogs/remove-all-sheet/remove-all-sheet.component';
import { ToastService } from 'angular-toastify';
import {RemoveSheetComponent} from '../../dialogs/remove-sheet/remove-sheet.component';
import {GraphComponent} from '@swimlane/ngx-graph';
import {Hero} from '../../data-access/entities/hero.entity';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass'],
  providers: []
})
export class EventListComponent implements OnInit {

  form: FormGroup;
  events: Event[] = [];

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private toastService: ToastService
  ) {
    this.getEvents();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      content: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }

  openCreateEventDialog() {
    const dialogRef = this.dialog.open(SaveEventDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createEvent();
      }

      this.form.reset();
    });
  }

  getEvents() {
    this.databaseService
      .connection
      .then(() => Event.find({order: {date: 'ASC'}}))
      .then(events => {
        this.events = events;
      });
  }

  createEvent() {
    if (this.form.valid) {
      const {name, content, date} = this.form.value;
      const event = new Event();

      event.name = name;
      event.content = content;
      event.date = moment(date).format('YYYY-MM-DD');
      event.created = moment().format('YYYY-MM-DD H:mm:ss');

      this.databaseService
        .connection
        .then(() => event.save())
        .then(() => {
          this.getEvents();
        })
        .then(() => {
          this.form.reset();

          this.dialog.closeAll();

          this.toastService.success('Event successfully created');
        })
        .catch((error) => {
          this.toastService.warn('Unable to create Event');
        });
    }
  }

  removeAllEventsSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(RemoveAllSheetComponent, {
      data: {
        entity: Event
      }
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.getEvents();
    });
  }

  removeEventSheet(event: Event) {
    const bottomSheetRef = this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Event,
        item: event
      }
    });

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.getEvents();
    });
  }

  openEditEventDialog(event: Event) {
    const {name, content, date} = event;

    this.form.controls.name.setValue(name);
    this.form.controls.content.setValue(content);
    this.form.controls.date.setValue(new Date(date));

    const dialogRef = this.dialog.open(SaveEventDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateEventHandler(event);
      }

      this.form.reset();
    });
  }

  updateEventHandler(event: Event) {
    if (this.form.valid) {
      const {name, content, date} = this.form.value;

      event.name = name;
      event.content = content;
      event.date = moment(date).format('YYYY-MM-DD');

      this.databaseService
        .connection
        .then(() => event.save())
        .then(() => {
          this.getEvents();
        })
        .then(() => {
          this.form.reset();

          this.toastService.success('Event successfully updated');
        })
        .catch((error) => {
          this.toastService.warn('Unable to update Event');
        });
    }
  }
}
