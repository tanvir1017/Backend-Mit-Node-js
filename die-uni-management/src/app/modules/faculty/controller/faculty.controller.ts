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
    const { id } = req.params;
    console.log("🚀 ~ getSingleFaculty:asyncHandler ~ id:", id);

    if (!id) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faculty ID required");
    }
    const result = await FacultyServices.getSingleFacultyFromDB(id);
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

  // TODO => update faculty from db
  updateFaculty: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { faculty: facultyData } = req.body;

    if (!id) {
      return sendResponse(res, {
        statuscode: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Faculty ID is required",
        data: null,
      });
    }
    if (!Object.keys(facultyData).length) {
      return sendResponse(res, {
        statuscode: httpStatus.NOT_ACCEPTABLE,
        success: false,
        message: "Faculty data required, empty value does not acceptable",
        data: null,
      });
    }

    const result = await FacultyServices.updateFacultyFromDB(id, facultyData);
    if (!result) {
      return sendResponse(res, {
        statuscode: httpStatus.NOT_FOUND,
        success: false,
        message: "Faculty not found by this id",
        data: null,
      });
    }

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Faculty updated successfully",
      data: result,
    });
  }),

  // TODO => delete faculty from db
  deleteFaculty: asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Faculty ID missing or mismatch",
      );
    }
    const result = await FacultyServices.deleteFacultyFromDB(id);
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
