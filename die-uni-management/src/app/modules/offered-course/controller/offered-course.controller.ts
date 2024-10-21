import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { OfferedCourseServices } from "../service/offered-course.service";

const createOfferedCourse = asyncHandler(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statuscode: 201,
    success: true,
    message: "Offered course created sucessfully",
    data: result,
  });
});

const updateOfferedCourse = asyncHandler(async (req, res) => {});

const getAllOfferedCourses = asyncHandler(async (req, res) => {});

const getSingleOfferedCourse = asyncHandler(async (req, res) => {});

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
};
