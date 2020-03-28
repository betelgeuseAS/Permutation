import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';

import { Book } from './book.entity';

@Entity({name: 'hero'})
export class Hero extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  position: number;

  @ManyToOne(type => Book, book => book.heroes)
  book: Book;
}
