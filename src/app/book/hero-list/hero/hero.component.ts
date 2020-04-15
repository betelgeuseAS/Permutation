import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../data-access/entities/hero.entity';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit {

  id: number;
  hero: Hero;
  private subscription: Subscription;

  images: Array<string> = [
    'https://images.unsplash.com/photo-1586958521692-f0318f828ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    'https://images.unsplash.com/photo-1586950828236-a0ca90027bdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  ];

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);

    this.getHeroById(this.id);
  }

  ngOnInit(): void {

  }

  getHeroById(heroId) {
    this.databaseService
      .connection
      .then(() => Hero.findOne({ where: {id: heroId},  relations: ['imagePreview'] }))
      .then(book => {
        this.hero = book;
      });
  }
}
