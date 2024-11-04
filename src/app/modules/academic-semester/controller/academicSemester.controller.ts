import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";

import { StudentService } from "../../student/service/student.service";
import { AcademicSemesterServices } from "../service/academicSemester.service";

// Todo => Create a new academic semester
const createAcademicSemester = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );
    sendResponse(res, {
      statuscode: httpStatus.OK,
      message: "semester created successfully",
      success: true,
      data: result,
    });
  },
);

// Todo => Get all academic semesters
const getAcademicSemesters = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await StudentService.getAllStudentsFromDB(req.query);

    // Sending response to the client
    sendResponse(res, {
      statuscode: 200,
      success: true,
      message: "All students fetched successfully",
      data: result,
    });
  },
);

// TODO: get all academic semester
const getallAcademicSemesters = asyncHandler(
  async (__req: Request, res: Response, next: NextFunction) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemestersFromDB();

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "All semesters fetched successfully",
      data: result,
    });
  },
);

// TODO: get all academic semester
const getSingleAcademicSemester = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { semesterID } = req.params;
    if (!semesterID) {
      sendResponse(res, {
        statuscode: httpStatus.NOT_FOUND,
        success: false,
        message: "Please provide a valid semester ID",
        data: null,
      });
    }

    const result =
      await AcademicSemesterServices.getSingleAcademicSemestersFromDB(
        semesterID,
      );

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "All semesters fetched successfully",
      data: result,
    });
  },
);

// TODO: update Data for Academic Semester
const updateSingleAcademicSemester = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { semesterID } = req.params;
    const academicSemesterData = req.body;

    if (!semesterID) {
      sendResponse(res, {
        statuscode: httpStatus.NOT_FOUND,
        success: false,
        message: "Please provide a valid semester ID",
        data: null,
      });
    }

    const result =
      await AcademicSemesterServices.updateSingleAcademicSemestersFromDB(
        semesterID,
        academicSemesterData,
      );
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: "Academic Semester data updated successfully",
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getallAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
