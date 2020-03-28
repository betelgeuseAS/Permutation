import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Settings } from './repositories/settings';

import { Book } from './entities/book.entity';
import { Hero } from './entities/hero.entity';

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
      entities: [Book, Hero],
      synchronize: true,
      logging: 'all',
    };
    this.connection = createConnection(this.options);
  }
}
