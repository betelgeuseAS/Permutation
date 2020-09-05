import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';

import { Place } from './place.entity';

@Entity({name: 'image_place'})
export class ImagePlace extends BaseEntity {

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

  @ManyToOne('Place', 'images', { nullable: true, eager: true, onDelete: 'CASCADE' })
  place: Place;
}
