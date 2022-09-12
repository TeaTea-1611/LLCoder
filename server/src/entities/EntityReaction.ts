import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { ReactionsType } from "../types/Reactions/ReactionsType";
import { _Entity } from "./Entity";
import { User } from "./User";

@ObjectType()
@Entity()
export class EntityReaction extends BaseEntity {
  @Field()
  @PrimaryColumn()
  user_id!: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Field()
  @PrimaryColumn()
  entity_id: number;

  @Field(() => _Entity)
  @ManyToOne(() => _Entity)
  @JoinColumn({ name: "entity_id", referencedColumnName: "id" })
  entity: _Entity;

  @Field()
  @Column({ enum: ReactionsType })
  type: ReactionsType;
}
