import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from 'typeorm';
import {Hero} from './hero.entity';

@Entity({name: 'image_hero'})
export class ImageHero extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  data: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @ManyToOne('Hero', 'images', { nullable: true, eager: true, onDelete: 'CASCADE' })
  hero: Hero;
}
