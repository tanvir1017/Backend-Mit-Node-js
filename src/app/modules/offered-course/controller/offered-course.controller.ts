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
    message: "Offered course created successfully",
    data: result,
  });
});

const updateOfferedCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "Offered course updated successfully",
    data: result,
  });
});

const getAllOfferedCourses = asyncHandler(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query,
  );

  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "All offered courses retrieve successfully",
    data: result,
  });
});

const getSingleOfferedCourse = asyncHandler(async (req, res) => {});

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
};
