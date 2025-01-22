import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, nullable: false })
  firstName: string;

  @Column('varchar', { length: 30, nullable: true })
  lastName: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  @Exclude()  //this hides your password when a user is created
  password: string;


  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
