import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Settings } from './repositories/settings';

import { Book } from './entities/book.entity';
import { Hero } from './entities/hero.entity';
import { ImageHero } from './entities/image-hero.entity';
import { AudioHero } from './entities/audio-hero.entity';
import { Note } from './entities/note.entity';
import { Place } from './entities/place.entity';
import { ImagePlace } from './entities/image-place.entity';
import { Event } from './entities/event.entity';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public connection: Promise<Connection>;
  private readonly options: ConnectionOptions;

  constructor() {
    Settings.initialize();

    this.options = {
      type: 'sqlite',
      database: Settings.dbPath,
      entities: [Book, Hero, ImageHero, AudioHero, Note, Place, ImagePlace, Event],
      synchronize: true,
      // logging: 'all',
    };

    this.connection = createConnection(this.options);
  }
}
