import { StatusCodes as httpStatusCode } from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { EnrolledCourseServices } from "../service/enrolled-course.service";

// create enrolled courses
const createEnrolledCourse = asyncHandler(async (req, res) => {
  const user = req.user; // user from access token of that individual user who want to enroll into course

  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    user,
    req.body,
  );
  sendResponse(res, {
    statuscode: httpStatusCode.CREATED,
    success: true,
    message: "Enrolled course created successfully",
    data: result,
  });
});

// get all enrolled courses
const getAllEnrolledCourse = asyncHandler(async (req, res) => {});

// get single enrolled courses
const getSingleEnrolledCourse = asyncHandler(async (req, res) => {});

// update enrolled course
const updateEnrolledCourse = asyncHandler(async (req, res) => {});

// delete enrolled course
const deleteEnrolledCourse = asyncHandler(async (req, res) => {});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getAllEnrolledCourse,
  getSingleEnrolledCourse,
  updateEnrolledCourse,
  deleteEnrolledCourse,
};
