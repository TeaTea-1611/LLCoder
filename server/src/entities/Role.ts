import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  value: string;

  @Field()
  @Column()
  name_vi: string;

  @Field()
  @Column()
  name_en: string;
}
