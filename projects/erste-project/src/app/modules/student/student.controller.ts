import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { studentService } from "./student.service";

// TODO =>  Student fetch controller From DB
const getAllStudent = async (
  __req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    sendResponse(res, {
      statuscode: 200,
      success: true,
      message: "All students fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// TODO =>  Get single student

const getSingleStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const result = await studentService.getSingleStudentFromDB(id);
  if (!result) {
    sendResponse(res, {
      statuscode: 404,
      success: false,
      message: "Student not found by this id",
      data: {},
    });
  }

  sendResponse(res, {
    statuscode: 400,
    success: true,
    message: "Student fetched successfully",
    data: result,
  });
  try {
    const { id } = req.body.params;

    // TODO => checking id is available or not
    if (id) {
      const result = await studentService.getSingleStudentFromDB(id);

      // TODO => check if data found by this id or id is correct
      if (!result) {
        sendResponse(res, {
          statuscode: 404,
          success: false,
          message: "Student not found by this id",
          data: null,
        });
      }

      // TODO => If data found by this id then:
      sendResponse(res, {
        statuscode: 200,
        success: true,
        message: `Student found by this specific id: ${id}`,
        data: result,
      });
    }

    // TODO => If id is not given or Id not found, Then:
    sendResponse(res, {
      statuscode: 404,
      success: false,
      message: "Id not found from client",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// TODO =>  Delete single student
const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    // TODO => checking id params
    if (!studentId) {
      sendResponse(res, {
        statuscode: 400,
        success: false,
        message: "Student id is required",
        data: null,
      });
    }

    const result = await studentService.deleteStudentFromDB(studentId);

    // TODO => checking the result if id is available or not
    if (!result) {
      sendResponse(res, {
        statuscode: 404,
        success: false,
        message: "Student not found",
        data: null,
      });
    }

    // TODO => If result is not available
    sendResponse(res, {
      statuscode: 200,
      success: true,
      message: "Student deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const { studentUpdateAbleInfo } = req.body;

    // TODO => checking id is available or not
    if (!studentId) {
      sendResponse(res, {
        statuscode: 400,
        success: false,
        message: "Student id is required",
        data: null,
      });
    }

    const result = await studentService.updateStudentFromDB(
      studentId,
      studentUpdateAbleInfo,
    );
    sendResponse(res, {
      statuscode: 200,
      success: true,
      message: "Student updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudent,
  getSingleStudentById,
  deleteStudentById,
  updateStudent,
};
