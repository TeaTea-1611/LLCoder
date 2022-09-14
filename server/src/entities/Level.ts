import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Level extends BaseEntity {
  @Field()
  @PrimaryColumn()
  level: number;

  @Field()
  @Column({ unique: true })
  min_xp: number;

  @Field()
  @Column()
  name_vi: string;

  @Field()
  @Column()
  name_en: string;
}
