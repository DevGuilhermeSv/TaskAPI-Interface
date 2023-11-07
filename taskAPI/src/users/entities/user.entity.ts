import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name: string;
  @Column()
  userName: string;
  @Column()
  password: string;
  @Column({ default: true })
  status: boolean;
  @Column({ name: 'created_at' })
  createdAt: Date = new Date();
}
