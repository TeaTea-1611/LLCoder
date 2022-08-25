import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.exercises)
  user: User;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field()
  @Column({ type: "text", default: "" })
  text: string;

  @Field()
  @Column({ default: 0 })
  difficulty!: number;

  @Field(() => [Category])
  @ManyToMany(() => Category, (category) => category.exercises)
  @JoinTable()
  categories!: Category[];

  @Field()
  @Column({ default: 10 })
  exp: number;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
