import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';

import * as moment from 'moment';

// import { Book } from './book.entity';
import { IHero } from './IHero';
import { IBook } from './IBook';

@Entity({name: 'hero'})
export class Hero extends BaseEntity implements IHero {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  position: number;

  @Column({default: moment().format('YYYY-MM-DD H:mm:ss')})
  created: string;

  // WARNING: this path leads to circular dependencies:
  // @ManyToOne(type => Book, book => book.heroes, { nullable: false, eager: true, onDelete: 'CASCADE' })
  // book: Book;
  // Than use implements interface and:
  @ManyToOne('Book', 'heroes', { nullable: false, eager: true, onDelete: 'CASCADE' })
  book: IBook;
}
