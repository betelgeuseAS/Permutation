import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from 'typeorm';

@Entity({name: 'event'})
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column()
  content: string;

  @Column()
  date: string;

  @Column({nullable: true})
  created: string;
}
