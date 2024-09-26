import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// TODO =>  Student creation controller
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // Send response
    sendResponse(res, {
      statuscode: 201,
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
