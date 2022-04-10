import { UserStatus } from "$types/enums";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint", unsigned: true })
  id: number;

  @Column({
    name: "status",
    type: "tinyint",
    default: 1,
    comment: "1: Active, 0: Inactive, 2: Not verify",
    nullable: true,
  })
  status: UserStatus;

  @Column({
    name: "email",
    type: "varchar",
    length: 255,
    comment: "Email of the user.",
    unique: true,
  })
  email: string;

  @Column({ name: "password", type: "varchar", length: 100, select: false })
  password: string;

  @Column({
    name: "is_super_admin",
    type: "boolean",
    default: 0,
    comment: "1: Active, 0: Inactive",
    nullable: true,
  })
  isSuperAdmin?: number;

  @Column({
    name: "gender",
    type: "tinyint",
    nullable: true,
    comment: "1: Male, 2: Female",
  })
  gender?: number;

  @Column({
    name: "phone",
    type: "varchar",
    length: 20,
    comment: "Phone number of the user.",
    nullable: true,
  })
  phone?: string;

  @Column({
    name: "name",
    type: "varchar",
    length: 255,
    nullable: true,
    comment: "Full name of the user",
  })
  name?: string;

  @Column({
    name: "birthday",
    type: "date",
    nullable: true,
  })
  birthday?: string | Date | null;

  @Column({
    name: "avatar",
    type: "varchar",
    length: 255,
    comment: "Avatar of the user.",
    nullable: true,
  })
  avatar?: string;

  @Column({
    name: "refresh_token",
    type: "text",
    comment: "Avatar of the user.",
    select: false,
    nullable: true,
  })
  refreshToken?: string;

  @UpdateDateColumn({
    name: "update_at",
    type: "datetime",
  })
  updateAt?: string;

  @UpdateDateColumn({
    name: "created_at",
    type: "datetime",
  })
  createdAt?: string;
}
