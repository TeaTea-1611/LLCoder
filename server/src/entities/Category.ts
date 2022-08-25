import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exercise } from "./Exercise";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  nameVi!: string;

  @Field()
  @Column({ unique: true })
  nameEn!: string;

  @Field(() => [Exercise])
  @ManyToMany(() => Exercise, (exercise) => exercise.categories)
  exercises: Exercise[];
}
