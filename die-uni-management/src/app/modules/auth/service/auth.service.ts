import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { PasswordData, TLoginUser } from "../interface/auth.interface";

// TODO => validate BLOCK | WRONG PASSWORD | EXISTENCE of an user

const validateBlockPasswordExistenceOfAnUser = async (userId: string) => {};

// TODO: Implement function to validate user credentials
const loginValidateUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(400, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(400, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(400, "User is blocked by admin");
  }

  //* check if password is matched or not
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(400, "Password and user doesn't match");
  }

  //* access granted. and return token to client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_TOKEN!, {
    expiresIn: "10d",
  });

  return { accessToken, needPasswordChange: user.needsPasswordChange };
};

const changeOldPassword = async (
  userData: JwtPayload,
  payload: PasswordData,
) => {
  console.log(userData);
  const user = await User.isUserExistByCustomId(userData.userId);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(400, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(400, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(400, "User is blocked by admin");
  }

  //* check if password is matched or not
  if (!(await User.isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(400, "Password and user doesn't match");
  }

  // TODO => Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.BCRYPT_SALT),
  );

  const result = await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true, runValidators: true },
  );

  return null;
};
export const AuthServices = {
  loginValidateUser,
  changeOldPassword,
};
