import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({name: 'image_hero_preview'})
export class ImageHeroPreview extends BaseEntity {

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
}
