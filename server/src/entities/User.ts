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
import { Exercise } from "./Exercise";

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
  dateOfBirth: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLogin: Date;

  @Field()
  @Column({ default: false })
  darkMode: boolean;

  @Field()
  @Column({ default: "vi" })
  language: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
