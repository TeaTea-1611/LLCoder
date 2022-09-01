import { UserRoleType } from "../types/user/UserType";
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
import { LanguageType, ThemeType } from "../types/user/Settings";
import { BlogComment } from "./BlogComment";
import { BlogCommentReactions } from "./BlogCommentReactions";

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
  @Column({
    enum: UserRoleType,
    default: UserRoleType.GHOST,
  })
  role!: UserRoleType;

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
  lastLogin: Date;

  @Field()
  @Column({ enum: ThemeType, default: ThemeType.light })
  theme: ThemeType;

  @Field()
  @Column({ enum: LanguageType, default: LanguageType.vi })
  language: LanguageType;

  @Field(() => [Blog])
  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => BlogComment, (comment) => comment.user)
  blogComments: Comment[];

  @OneToMany(() => BlogCommentReactions, (reactions) => reactions.user)
  blogCommentReactions: BlogCommentReactions[];

  @Field(() => [Exercise])
  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
