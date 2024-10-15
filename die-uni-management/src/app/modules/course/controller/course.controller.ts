import httpStatus from "http-status";
import AppError from "../../../errors/appError";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { CourseServices } from "../service/course.service";

// TODO =>  Create course controller
const createCourse = asyncHandler(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Can not create course");
  }
  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Course is created successfully",
    data: result,
  });
});

// TODO => get all courses controller
const getAllCourses = asyncHandler(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "All courses retrieve successfully",
    data: result,
  });
});

// TODO => get single course controller
const getSingleCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Id is required to find specific course",
    );
  }

  const result = await CourseServices.getSingleCoursesFromDB(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Course retrieve successfully",
    data: result,
  });
});

// TODO => delete course controller
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, "Course id missing");
  }

  const result = await CourseServices.deleteCourseFromDB(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to delete");
  }

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "course deleted successfully",
    data: result,
  });
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const course = req.body;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, "Mismatch with course id");
  }
  if (!Object.keys(course).length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You made no changes or Mismatch with course id",
    );
  }

  const result = await CourseServices.updateCourseIntoDB(id, course);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
  }

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "course is updated successfully",
    data: result,
  });
});

export const CourseControllers = {
  getAllCourses,
  deleteCourse,
  getSingleCourse,
  createCourse,
  updateCourse,
};
