import httpStatus from "http-status-codes";
import AppError from "../../../errors/appError";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "../service/user.service";

// TODO   =>  Student creation controller
const createStudent = asyncHandler(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new student");
  }

  // Send response
  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

const createFaculty = asyncHandler(async (req, res) => {
  const { password, faculty } = req.body;
  const result = await UserServices.createFacultyIntoDB(password, faculty);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new Faculty");
  }
  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Faculty created successfully",
    data: result,
  });
});

const createAdmin = asyncHandler(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  const result = await UserServices.getMeFromDB(user);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "I found myself successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

const changeStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.changeStatusOfAnUserFromDB(id, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Status changed successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
