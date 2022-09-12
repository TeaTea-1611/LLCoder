import { Max, Min } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ExerciseCategory } from "./ExerciseCategory";
import { ExerciseDifficulty } from "./ExerciseDifficulty";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Min(5)
  @Max(30)
  @Column({ default: 5 })
  xp: number;

  @Field()
  @Column()
  difficulty_id: number;

  @Field(() => ExerciseDifficulty)
  @ManyToOne(() => ExerciseDifficulty)
  @JoinColumn({ name: "difficulty_id", referencedColumnName: "id" })
  difficulty: ExerciseDifficulty;

  @Field(() => [ExerciseCategory])
  @ManyToMany(() => ExerciseCategory, (category) => category.exercises)
  categories: ExerciseCategory[];

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
