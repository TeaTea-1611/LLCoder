import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Blog } from "./Blog";
import { Comment } from "./Comment";
import { Exercise } from "./Exercise";
import { Reactions } from "./Reactions";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  nickname!: string;

  @Field()
  @Column({ default: 4, enum: [0, 1, 2, 3, 4] })
  // 0: admin | 1: teacher | 2: supervisor | 3: student | 4: user
  role: number;

  @Field()
  @Column({ default: false })
  confirmed!: boolean;

  @Field()
  @Column({ default: "" })
  avatar: string;

  @Field()
  @Column({ default: 0 })
  exp: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dob: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ll: Date;

  @Field()
  @Column({ default: false })
  darkMode: boolean;

  @Field()
  @Column({ default: "vi" })
  language: string;

  @Field(() => [Blog])
  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @OneToMany(() => Reactions, (reactions) => reactions.user)
  reactions: Reactions[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
