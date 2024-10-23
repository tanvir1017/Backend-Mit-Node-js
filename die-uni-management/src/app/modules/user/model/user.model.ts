import bcrypt from "bcrypt";
import mongoose, { model } from "mongoose";

import config from "../../../config";
import * as TUserInterface from "../interface/user.interface";

const UserSchema = new mongoose.Schema<
  TUserInterface.TUser,
  TUserInterface.UserModel
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "student", "faculty"],
        message: "{VALUE} is not a valid role",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["in-progress", "blocked"],
        message: "{VALUE} is not a valid status",
      },
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  // Optional Properties for @createdAt and @updatedAt properties
  {
    timestamps: true,
  },
);

// TODO => pre save middle/hooks ware: will work save method
UserSchema.pre("save", async function (next) {
  // perform some operations here before saving the document to the database

  // TODO => hashing function to has password
  const user = this; // currently processable document
  user.password = await bcrypt.hash(user.password, Number(config.BCRYPT_SALT));

  // calling next function/middleware
  next();
});

// TODO => Post save middle/hooks ware: work after save method
UserSchema.post("save", function (doc, next) {
  // TODO => Post save middle/hooks function will have two parameters doc, next
  doc.password = ""; // making password empty
  next();
});

// * Query Middleware

// TODO => modify return data where deleted data should not go to live
UserSchema.pre("find", function (next) {
  // * TODO => The find() method chaining ⛓️‍💥 with the service find() method get ➡️ getAllStudentsFromDB It will check before the service function find() will call and prevent those documents who has isDeleted = true
  this.find({ isDeleted: { $ne: true } });

  // TODO => Calling the next function to do his work
  next();
});

UserSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  // TODO => Calling the next function to do his work
  next();
});

UserSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// TODO => Implement static method for user exist or not
UserSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

// TODO => Implement static method for check password matched
UserSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// TODO => check if user blocked or not
UserSchema.statics.isUserBlocked = async function (id: string) {
  const user = await User.findOne({ id });
  return user?.status === "blocked" ? true : false;
};

export const User = model<TUserInterface.TUser, TUserInterface.UserModel>(
  "User",
  UserSchema,
);
