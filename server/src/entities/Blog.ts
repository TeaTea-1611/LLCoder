import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { BlogComment } from "./BlogComment";
@ObjectType()
@Entity()
export class Blog extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.blogs)
  user!: User;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field()
  @Column({ type: "text", default: "" })
  text!: string;

  @OneToMany(() => BlogComment, (comment) => comment.blog)
  comments: BlogComment[];

  @Field()
  @Column({ type: "int", default: 0 })
  commentsCount: number;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
