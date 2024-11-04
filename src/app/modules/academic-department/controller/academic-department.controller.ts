import httpStatus from "http-status-codes";
import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { AcademicDepartmentServices } from "../service/academic-department.service";

// TODO => the following function will create new Academic Department
const createAcademicDepartment = asyncHandler(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: "Academic Department created successfully",
    data: result,
  });
});

// TODO => the following function will create new Academic Department
const updateAcademicDepartment = asyncHandler(async (req, res) => {
  const { academicDepartmentID } = req.params;
  if (!academicDepartmentID) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      message: "Academic Department ID is required",
      data: null,
    });
  }
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
      academicDepartmentID,
      req.body,
    );
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Academic Department updated successfully",
    data: result,
  });
});

// TODO: Implement the function to fetch all academic departments from the database
const getAllAcademicDepartments = asyncHandler(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "All Academic Departments fetched successfully",
    data: result,
  });
});

// TODO: Implement the function to find single academic department from database
const getSingleAcademicDepartment = asyncHandler(async (req, res) => {
  const { academicDepartmentID } = req.params;
  if (!academicDepartmentID) {
    sendResponse(res, {
      statuscode: httpStatus.NOT_ACCEPTABLE,
      success: false,
      message: "Academic Department ID is required",
      data: null,
    });
  }
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      academicDepartmentID,
    );
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "Academic Department data found successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  createAcademicDepartment,
  updateAcademicDepartment,
  // deleteAcademicDepartment,
};
