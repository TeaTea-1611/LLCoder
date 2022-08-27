import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Entity as _Entity } from "./Entity";
@ObjectType()
@Entity()
export class Blog extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  entityId!: number;

  @Field(() => _Entity)
  @OneToOne(() => _Entity)
  @JoinColumn()
  entity: _Entity;

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

  @Field()
  @Column({ default: false })
  confirmed!: boolean;

  @Field()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
