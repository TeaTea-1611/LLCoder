import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field()
  @PrimaryColumn()
  value: string;

  @Field()
  @Column()
  name_vi: string;

  @Field()
  @Column()
  name_en: string;
}
