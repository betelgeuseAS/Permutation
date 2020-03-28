import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  id: number;
  private subscription: Subscription;

  constructor(
    private activateRoute: ActivatedRoute
  ) {

    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {}
}
