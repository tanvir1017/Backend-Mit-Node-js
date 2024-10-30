import config from "../../../config";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../service/auth.service";

const loginValidation = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginValidateUser(req.body);

  const { refreshToken, accessToken, needPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV !== "development",
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: config.NODE_ENV !== "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "User logged in successfully", // returns a success message if the login is successful.
    data: { needPasswordChange, accessToken }, // returns the validated user data or an error message if the login fails.
  });
});

const changePasswordValidation = asyncHandler(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changeOldPassword(req.user, passwordData);
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "Password updated successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenGenerate(refreshToken);

  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "Access token retrieve successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "Forget password link generated successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});
export const AuthController = {
  loginValidation,
  changePasswordValidation,
  refreshToken,
  forgetPassword,
};