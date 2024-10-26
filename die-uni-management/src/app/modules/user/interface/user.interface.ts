import mongoose from "mongoose";
import { USER_ROLE } from "../constant/user.constant";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends mongoose.Model<TUser> {
  //** checking user exist or not */
  isUserExistByCustomId: (id: string) => Promise<TUser>;

  //** check password match or not*/
  isPasswordMatched: (
    plainPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;

  //** check is user blocked or not*/
  isUserBlocked: (id: string) => Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
