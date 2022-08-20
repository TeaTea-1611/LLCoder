import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
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
  isActive: boolean;

  @Field()
  @Column({ default: "" })
  avatar: string;

  @Field()
  @Column({ default: 0 })
  exp: number;

  @Field()
  @Column({ nullable: true })
  lastLogin: Date;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
