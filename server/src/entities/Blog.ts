import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { _Entity } from "./Entity";
import { User } from "./User";
@ObjectType()
@Entity()
export class Blog extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id!: number;

  @Field(() => _Entity)
  @OneToOne(() => _Entity)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  entity: _Entity;

  @Column()
  user_id!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column("text")
  content: string;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.blogs)
  @JoinTable({ name: "blog_tag" })
  tags: Tag[];

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}

@ObjectType()
@Entity("tag")
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Blog])
  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Blog[];
}
