import { Request, Response } from "express";
import httpStatus from "http-status";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { studentService } from "../service/student.service";

// TODO =>  Student fetch controller From DB
const getAllStudent = asyncHandler(async (__req, res) => {
  const result = await studentService.getAllStudentsFromDB();

  // Sending response to the client
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "All students fetched successfully",
    data: result,
  });
});

// TODO =>  Get single student

const getSingleStudentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    // TODO => checking id is available or not
    if (studentId) {
      const result = await studentService.getSingleStudentFromDB(studentId);

      // TODO => check if data found by this id or id is correct
      if (!result) {
        sendResponse(res, {
          statuscode: httpStatus.NOT_FOUND,
          success: false,
          message: "Student not found by this id",
          data: null,
        });
      }

      // TODO => If data found by this id then:
      sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: `Student found by this specific id: ${studentId}`,
        data: result,
      });
    }

    // TODO => If id is not given or Id not found, Then:
    sendResponse(res, {
      statuscode: httpStatus.NOT_FOUND,
      success: false,
      message: "Id not found from client",
      data: null,
    });
  },
);

// TODO =>  Delete single student
const deleteStudentById = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  // TODO => checking id params
  if (!studentId) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      message: "Student id is required",
      data: null,
    });
  }

  const result = await studentService.deleteStudentFromDB(studentId);

  // TODO => checking the result if id is available or not
  if (!result) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_FOUND,
      success: false,
      message: "Student not found",
      data: null,
    });
  }

  // TODO => If result is successfully deleted
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: null,
  });
});

const updateStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { studentUpdateAbleInfo } = req.body;

  // TODO => checking id is available or not
  if (!studentId) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_ACCEPTABLE,
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
    statuscode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  getSingleStudentById,
  deleteStudentById,
  updateStudent,
};
