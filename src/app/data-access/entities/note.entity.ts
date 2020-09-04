import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from 'typeorm';

import { Book } from './book.entity';

@Entity({name: 'note'})
export class Note extends BaseEntity {

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

  @ManyToOne('Book', 'notes', { nullable: false, eager: true, onDelete: 'CASCADE' })
  book: Book;
}
