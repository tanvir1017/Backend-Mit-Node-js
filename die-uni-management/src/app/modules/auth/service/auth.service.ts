import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import AppError from "../../../errors/appError";
import { sendEmail } from "../../../utils/send-email";
import { User } from "../../user/model/user.model";
import { PasswordData, TLoginUser } from "../interface/auth.interface";
import { createToken, verifyToken } from "../utils/auth.utils";

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

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_TOKEN as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_TOKEN as string,
    config.JWT_REFRESH_EXPIRES_IN as string,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needsPasswordChange,
  };
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

const refreshTokenGenerate = async (token: string) => {
  //* Verify token
  const decoded = verifyToken(token, config.JWT_REFRESH_TOKEN as string);

  const { userId, iat } = decoded;

  const user = await User.isUserExistByCustomId(userId);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked by admin");
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_TOKEN!,
    config.JWT_ACCESS_EXPIRES_IN!,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistByCustomId(userId);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked by admin");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const resetToken = createToken(jwtPayload, config.JWT_ACCESS_TOKEN!, "10m");

  const resetUiLink = `${config.FRONTEND_DEV_ENV}?id=${user.id}&token=${resetToken}`;

  sendEmail(user.email, resetUiLink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistByCustomId(payload?.id);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not exist maybe deleted");
  }

  //* check if the user is blocked or not
  if (user.status === "blocked") {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked by admin");
  }

  //* verify token
  const decoded = verifyToken(token, config.JWT_ACCESS_TOKEN!);
  if (decoded && decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden user!");
  }

  // TODO => Hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.BCRYPT_SALT),
  );

  await User.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const AuthServices = {
  loginValidateUser,
  changeOldPassword,
  refreshTokenGenerate,
  forgetPassword,
  resetPassword,
};
