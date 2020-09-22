import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass'],
  providers: []
})
export class EventComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  getMomentDate(format) {
    return moment().format(format);
  }
}
