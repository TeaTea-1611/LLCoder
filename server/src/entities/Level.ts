import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Level extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
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
