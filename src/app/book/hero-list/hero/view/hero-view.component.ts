import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../../data-access/entities/hero.entity';
import { KsGalleryService } from '../../../../shared/services/ks-modal-gallery/ks-gallery.service';
import { Image } from '@ks89/angular-modal-gallery';
import { ImageHero } from '../../../../data-access/entities/image-hero.entity';
import { AudioPlayerService, PlayerOwnAudio } from '../../../../shared/services/audio-player.service';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-hero',
  templateUrl: './hero-view.component.html',
  styleUrls: ['./hero-view.component.sass']
})
export class HeroViewComponent implements OnInit {

  id: number;
  hero: Hero;

  images: Image[] = [];

  playlistAdvanced: PlayerOwnAudio[] = [];
  displayTitleAdvanced = this.audioPlayerService.getOptionsAdvanced().displayTitle;
  displayPlaylistAdvanced = this.audioPlayerService.getOptionsAdvanced().displayPlayList;
  pageSizeOptionsAdvanced = this.audioPlayerService.getOptionsAdvanced().pageSizeOptions;
  displayVolumeControlsAdvanced = this.audioPlayerService.getOptionsAdvanced().displayVolumeControls;

  quillContent: string | null;

  private subscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    public ksGalleryService: KsGalleryService,
    public audioPlayerService: AudioPlayerService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.heroId);

    this.getHeroById(this.id);
  }

  ngOnInit(): void {}

  getHeroById(heroId) {
    this.databaseService
      .connection
      .then(() => Hero.findOne({ where: {id: heroId},  relations: ['images', 'audios'] }))
      .then(hero => {
        this.hero = hero;

        this.updateHeroBreadcrumb();

        const img: ImageHero[] = [...this.hero.images];
        this.images = this.ksGalleryService.getImages(img);

        this.playlistAdvanced = this.audioPlayerService.getAudios(this.hero.audios);

        this.quillContent = this.hero.content;
      });
  }

  updateHeroBreadcrumb() {
    this.ngDynamicBreadcrumbService.updateBreadcrumbLabels({
      bookBreadcrumb: this.hero.book.name,
      heroBreadcrumb: this.hero.name
    });
  }
}
