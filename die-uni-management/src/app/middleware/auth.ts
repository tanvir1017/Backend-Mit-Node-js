import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/appError";
import { TUserRole } from "../modules/user/interface/user.interface";
import asyncHandler from "../utils/asyncHandler";

export const authGuard = (...requiredRole: TUserRole[]) =>
  asyncHandler(async (req, res, next) => {
    const { authorization: token } = req.headers;

    //* if token is available or not
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized user");
    }

    //* Verify token
    jwt.verify(token, config.JWT_ACCESS_TOKEN!, function (error, decoded) {
      if (error) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Yore not authorized");
      }

      const role = (decoded as JwtPayload).role;
      console.log({ requiredRole, role });
      // verify role for authorization
      if (requiredRole && !requiredRole.includes(role)) {
        console.log(role);
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      // if decoded undefined
      req.user = decoded as JwtPayload;
      next();
    });
  });
