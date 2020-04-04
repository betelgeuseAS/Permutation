import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';

// import { Hero } from './hero.entity';
import { IBook } from './IBook';
import { IHero } from './IHero';

@Entity({name: 'book'})
export class Book extends BaseEntity implements IBook {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  position: number;

  // WARNING: this path leads to circular dependencies:
  // @OneToMany(type => Hero, hero => hero.book)
  // heroes: Hero[];
  // Than use implements interface and:
  @OneToMany('Hero', 'book')
  heroes: IHero[];
}
