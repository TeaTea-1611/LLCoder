import { MaxLength, MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { _Entity } from "./Entity";
import { Role } from "./Role";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @MinLength(6)
  @MaxLength(20)
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
  @Column({ nullable: true })
  role_id: string;

  @Field(() => Role)
  @ManyToOne(() => Role)
  @JoinColumn({ name: "role_id", referencedColumnName: "value" })
  role: Role;

  @Field()
  @Column({ default: false })
  confirmed!: boolean;

  @Field()
  @Column({ default: "" })
  avatar: string;

  @Field()
  @Column({ default: 0 })
  xp: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date_of_birth: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_login: Date;

  @Field(() => [_Entity])
  @OneToMany(() => _Entity, (entity) => entity.user)
  entities: _Entity[];

  @Field()
  @CreateDateColumn()
  created_at!: Date;

  @Field()
  @UpdateDateColumn()
  updated_at!: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
