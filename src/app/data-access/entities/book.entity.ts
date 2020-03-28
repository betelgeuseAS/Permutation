import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';

import { Hero } from './hero.entity';

@Entity({name: 'book'})
export class Book extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({default: 0})
  position: number;

  @OneToMany(type => Hero, hero => hero.book)
  heroes: Hero[];
}
