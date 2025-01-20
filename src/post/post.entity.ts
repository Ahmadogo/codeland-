import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { postType } from './enums/postType.enum';
import { statusType } from './enums/statusType.enum';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @ManyToOne(() => User, (user) => user.posts)  
  author: User;

  @Column({ type: 'enum', enum: postType, default: postType.STORY })
  postType: postType;

  @Column({ type: 'enum', enum: statusType, default: statusType.DRAFT })
  postStatus: statusType;

  @Column('varchar')
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn() // Automatically set to the current date when the entity is created
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'date' }) // Explicit date column
  publishedDate: Date;

  
  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
  })
  @JoinColumn()
  metaOptions?: MetaOption;

  @ManyToOne(() => Tag )
  @Column('text', { array: true, nullable: true })
  tags: Tag[];
  
  @ManyToMany(() => Tag, (tag) => tag.post)
  @JoinTable()
  tag: Tag[];
}
