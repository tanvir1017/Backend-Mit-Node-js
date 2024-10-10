import httpStatus from "http-status";
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

export const UserControllers = {
  createStudent,
  createFaculty,
};
