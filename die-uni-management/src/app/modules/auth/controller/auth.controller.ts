import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "../service/auth.service";

const loginValidation = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginValidateUser(req.body);
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "User logged in successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

export const AuthController = {
  loginValidation,
};
