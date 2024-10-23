import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { TLoginUser } from "../interface/auth.interface";

// TODO: Implement function to validate user credentials
const loginValidateUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload.id);

  //* check if user exists in DB by id
  if (!user) {
    throw new AppError(400, "user doesn't exist");
  }

  //* check if the user is deleted(soft) or not
  /* if (isUserDeleted) {
    throw new AppError(400, "User is not exist maybe deleted");
  } */

  //* check if the user is blocked or not
  if (await User.isUserBlocked(payload?.id)) {
    throw new AppError(400, "User is blocked by admin");
  }

  //* check if password is matched or not
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(400, "Password and user doesn't match");
  }

  //* access granted.

  return payload;
};
export const AuthServices = {
  loginValidateUser,
};
