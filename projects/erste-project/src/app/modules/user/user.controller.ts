import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// TODO   =>  Student creation controller
const createStudent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // Send response
    sendResponse(res, {
      statuscode: httpStatus.CREATED,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  },
);

export const UserControllers = {
  createStudent,
};
