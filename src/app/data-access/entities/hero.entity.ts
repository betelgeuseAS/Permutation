import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, JoinColumn, OneToMany} from 'typeorm';

import { Book } from './book.entity';
import { ImageHeroPreview } from './image-hero-preview.entity';
import { ImageHero } from './image-hero.entity';

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

  @Column({nullable: true})
  created: string;

  // WARNING: this path leads to circular dependencies:
  // @ManyToOne(type => Book, book => book.heroes, { nullable: false, eager: true, onDelete: 'CASCADE' })
  // book: Book;
  // Than use implements interface and:
  @ManyToOne('Book', 'heroes', { nullable: false, eager: true, onDelete: 'CASCADE' })
  book: Book;

  @OneToOne(type => ImageHeroPreview, { nullable: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  imagePreview: ImageHeroPreview;

  @OneToMany('ImageHero', 'hero')
  images: ImageHero[];
}
