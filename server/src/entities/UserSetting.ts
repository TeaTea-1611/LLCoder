import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { AllowedSettingValue, Setting } from "./Setting";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserSetting extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  user_id: number;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Field(() => ID)
  @PrimaryColumn()
  setting_id: number;

  @Field(() => Setting)
  @ManyToOne(() => Setting)
  @JoinColumn({ name: "setting_id", referencedColumnName: "id" })
  setting: Setting;

  @Field(() => ID)
  @Column()
  allowed_setting_value_id: number;

  @Field(() => AllowedSettingValue)
  @ManyToOne(() => AllowedSettingValue)
  @JoinColumn({ name: "allowed_setting_value_id", referencedColumnName: "id" })
  allowed_setting_value: AllowedSettingValue;
}
