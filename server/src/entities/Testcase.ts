import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class Testcase extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  exercise_id!: number;

  @Field(() => Exercise)
  @ManyToOne(() => Exercise)
  @JoinColumn({ name: "exercise_id", referencedColumnName: "id" })
  exercise: Exercise;

  @Field({ nullable: true })
  @Column({ nullable: true })
  input: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  output: string;
}
