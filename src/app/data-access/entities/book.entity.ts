import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';

import { Hero } from './hero.entity';
import { Note } from './note.entity';

@Entity({name: 'book'})
export class Book extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  plotLinks: string;

  @Column({nullable: true})
  plotNodes: string;

  @Column({nullable: true})
  content: string;

  @Column({default: 0})
  position: number;

  @Column({nullable: true})
  created: string;

  // WARNING: this path leads to circular dependencies:
  // @OneToMany(type => Hero, hero => hero.book)
  // heroes: Hero[];
  // Than use implements interface and:
  @OneToMany('Hero', 'book')
  heroes: Hero[];

  @OneToMany('Note', 'book')
  notes: Note[];
}
