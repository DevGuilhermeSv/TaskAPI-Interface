import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Taskschema {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    nullable: false,
  })
  title: string;
  @Column()
  description: string;
  @Column({ default: false })
  status: boolean;
  @Column({ name: 'created_at' })
  createdAt: Date = new Date();
  @Column({ name: 'finished_at', nullable: true })
  finishedAt?: Date;
}
