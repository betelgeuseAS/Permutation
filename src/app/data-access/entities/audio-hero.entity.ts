import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from 'typeorm';
import {Hero} from './hero.entity';

@Entity({name: 'audio_hero'})
export class AudioHero extends BaseEntity {

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

  @ManyToOne('Hero', 'audios', { nullable: true, eager: true, onDelete: 'CASCADE' })
  hero: Hero;
}
