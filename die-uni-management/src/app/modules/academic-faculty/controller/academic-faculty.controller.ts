import httpStatus from "http-status";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AcademicFacultyServices } from "../service/academic-faculty.service";

// TODO: Implement the logic to create a new academic faculty into the database
const createAcademicFaculty = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(body);
  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Academic Faculty is created successfully",
    data: result,
  });
});

// TODO: Implement the logic to get all academic faculties
const getAllAcademicFaculties = asyncHandler(async (req, res, next) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "All Academic Faculties fetched successfully",
    data: result,
  });
});

// TODO: Implement the logic to get a single academic faculty by ID
const getSingleAcademicFaculty = asyncHandler(async (req, res, next) => {
  const { facultyID } = req.params;

  // TODO =>  check if faculty id is given or not?
  if (!facultyID) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_FOUND,
      message: "Academic Faculty ID not found",
      success: false,
      data: null,
    });
  }
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyID);

  // TODO =>  check if faculty id is valid ?
  if (!result) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_FOUND,
      success: false,
      message: "Academic Faculty not found",
      data: null,
    });
  }

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Academic Faculty fetched successfully",
    data: result,
  });
});

// TODO: Implement the logic to update a single academic faculty by ID

const updateSingleAcademicFaculty = asyncHandler(async (req, res, next) => {
  const { facultyID } = req.params;
  const academicFacultyData = req.body;

  // TODO =>  check if faculty id is given or not?
  if (!facultyID) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_FOUND,
      message: "Academic Faculty ID not found",
      success: false,
      data: null,
    });
  }
  const result =
    await AcademicFacultyServices.updateSingleAcademicFacultyFromDB(
      facultyID,
      academicFacultyData,
    );
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Academic Faculty updated successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
