import httpStatus from "http-status";
import AppError from "../../../errors/appError";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { FacultyServices } from "../service/faculty.service";

export const FacultyControllers = {
  // TODO => get all faculties
  getAllFaculties: asyncHandler(async (__req, res) => {
    const result = await FacultyServices.getAllFacultyFromDB();
    if (!result) {
      return sendResponse(res, {
        statuscode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Failed to retrieve faculties from database",
        data: result,
      });
    }
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Retrieve all faculties successfully",
      data: result,
    });
  }),

  //  TODO => get only single faculty
  getSingleFaculty: asyncHandler(async (req, res) => {
    const { facultyId } = req.params;

    if (!facultyId) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty ID required");
    }
    const result = await FacultyServices.getSingleFacultyFromDB(facultyId);
    if (!result) {
      return sendResponse(res, {
        statuscode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Failed to retrieve faculty from database",
        data: result,
      });
    }
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Retrieve faculty successfully",
      data: result,
    });
  }),

  // TODO => delete faculty from db
  deleteFaculty: asyncHandler(async (req, res) => {
    const { facultyId } = req.params;

    if (!facultyId) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Faculty ID missing or mismatch",
      );
    }
    const result = await FacultyServices.deleteFacultyFromDB(facultyId);
    if (!result) {
      return sendResponse(res, {
        statuscode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Failed to delete faculty from database",
        data: result,
      });
    }
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "faculty delete sucessfull",
      data: result,
    });
  }),
};
