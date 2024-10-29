import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/appError";
import { TUserRole } from "../modules/user/interface/user.interface";
import { User } from "../modules/user/model/user.model";
import asyncHandler from "../utils/asyncHandler";

export const authGuard = (...requiredRole: TUserRole[]) =>
  asyncHandler(async (req, res, next) => {
    const { authorization: token } = req.headers;

    //* if token is available or not
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized user");
    }

    //* Verify token
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_TOKEN as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    const user = await User.isUserExistByCustomId(userId);

    //* check if user exists in DB by id
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "user doesn't exist");
    }

    //* check if the user is deleted(soft) or not
    if (user.isDeleted) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "User is not exist maybe deleted",
      );
    }

    //* check if the user is blocked or not
    if (user.status === "blocked") {
      throw new AppError(StatusCodes.BAD_REQUEST, "User is blocked by admin");
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChange(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
    }
    // verify role for authorization
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "You are not authorized by this role!",
      );
    }

    // if decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
