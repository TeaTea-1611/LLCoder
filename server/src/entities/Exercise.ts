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
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { _Entity } from "./Entity";
import { Testcase } from "./Testcase";
import { User } from "./User";

@ObjectType()
@Entity()
export class Difficulty extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name_vi: string;

  @Field()
  @Column({ unique: true })
  name_en: string;
}

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => [Exercise])
  @OneToMany(() => Exercise, (exercise) => exercise.category)
  exercises: Exercise[];
}
@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  difficulty_id: number;

  @Field(() => Difficulty, { nullable: true })
  @ManyToOne(() => Difficulty)
  @JoinColumn({ name: "difficulty_id", referencedColumnName: "id" })
  difficulty: Difficulty;

  @Field()
  @Column({ default: 5 })
  xp: number;

  @Column({ nullable: true })
  category_id: number;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category: Category;

  @Field(() => [ExerciseForm], { nullable: true })
  @ManyToMany(() => ExerciseForm, (form) => form.exercises)
  @JoinTable({ name: "exercise_form" })
  form: ExerciseForm[];

  @Field(() => [Testcase])
  @OneToMany(() => Testcase, (testcase) => testcase.exercise)
  testcase: Testcase[];

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
@Entity("form")
export class ExerciseForm extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name_vi!: string;

  @Field()
  @Column({ unique: true })
  name_en!: string;

  @Field(() => [Exercise])
  @ManyToMany(() => Exercise, (exercise) => exercise.form)
  exercises: Exercise[];
}
