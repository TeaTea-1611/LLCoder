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
import { Level } from "./Level";
import { Role } from "./Role";
import { UserSetting } from "./UserSetting";

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  mssv: string;

  @Column()
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

  @Column()
  level: number;

  @Column()
  next_level: number;

  @Field(() => Level)
  @ManyToOne(() => Level)
  @JoinColumn({ name: "level", referencedColumnName: "level" })
  xp_level: Level;

  @Field(() => Level)
  @ManyToOne(() => Level)
  @JoinColumn({ name: "next_level", referencedColumnName: "level" })
  xp_next_level: Level;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date_of_birth: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_login: Date;

  @Field(() => [_Entity])
  @OneToMany(() => _Entity, (entity) => entity.user)
  entities: _Entity[];

  @Field(() => [UserSetting])
  @OneToMany(() => UserSetting, (setting) => setting.user)
  settings: UserSetting[];

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
