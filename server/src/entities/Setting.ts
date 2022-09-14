import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Setting extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  description: string;

  @Field()
  @Column({ default: false })
  constrained: boolean;
}

@ObjectType()
@Entity()
export class AllowedSettingValue extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  setting_id: string;

  @Field(() => Setting)
  @ManyToOne(() => Setting)
  @JoinColumn({ name: "setting_id", referencedColumnName: "id" })
  setting: Setting;

  @Field()
  @Column()
  value: string;

  @Field()
  @Column()
  caption: string;
}
