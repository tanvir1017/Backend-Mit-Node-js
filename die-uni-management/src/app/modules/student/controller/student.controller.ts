import httpStatus from "http-status";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { StudentService } from "../service/student.service";

// TODO =>  Student fetch controller From DB
const getAllStudent = asyncHandler(async (req, res) => {
  const searchTerm = req.query;
  const result = await StudentService.getAllStudentsFromDB(searchTerm);

  // Sending response to the client
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "All students fetched successfully",
    data: result,
  });
});

// TODO =>  Get single student

const getSingleStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // TODO => checking id is available or not
  if (!id) {
    // TODO => If id is not given or Id not found, Then:
    return sendResponse(res, {
      statuscode: httpStatus.NOT_FOUND,
      success: false,
      message: "Id not found from client",
      data: null,
    });
  }
  const result = await StudentService.getSingleStudentFromDB(id);

  // TODO => check if data found by this id or id is correct
  if (!result) {
    return sendResponse(res, {
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
    message: `Student found by this specific id: ${id}`,
    data: result,
  });
});

// TODO =>  Delete single student
const deleteStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // TODO => checking id params
  if (!id) {
    return sendResponse(res, {
      statuscode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      message: "Student id is required",
      data: null,
    });
  }

  const result = await StudentService.deleteStudentFromDB(id);

  // TODO => checking the result if id is available or not
  if (!result) {
    return sendResponse(res, {
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
  const { id } = req.params;
  const { student } = req.body;

  // TODO => checking id is available or not
  if (!id) {
    return sendResponse(res, {
      statuscode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      message: "Student id is required",
      data: null,
    });
  }

  const result = await StudentService.updateStudentFromDB(id, student);
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
