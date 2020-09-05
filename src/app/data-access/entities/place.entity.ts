import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany
} from 'typeorm';

import { Book } from './book.entity';
import { ImagePlace } from './image-place.entity';

@Entity({name: 'place'})
export class Place extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: 0})
  position: number;

  @Column({nullable: true})
  content: string;

  @Column({nullable: true})
  created: string;

  @ManyToOne('Book', 'places', { nullable: false, eager: true, onDelete: 'CASCADE' })
  book: Book;

  @OneToMany('ImagePlace', 'place')
  images: ImagePlace[];
}
