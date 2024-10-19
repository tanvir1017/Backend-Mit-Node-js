import asyncHandler from "../../../utils/asyncHandler";
import sendResponse from "../../../utils/sendResponse";
import { SemesterRegistrationServices } from "../service/semester-registration.service";

const getAllRegisteredSemester = asyncHandler(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllRegisteredSemesterFromDB(
      req.query,
    );
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "All registered semester retrieve successfully",
    data: result,
  });
});

const getSingleRegisteredSemester = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleRegisteredSemesterFromDB(id);
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: `Data retrieve by ${id}`,
    data: result,
  });
});

const createSemesterRegistration = asyncHandler(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statuscode: 201,
    success: true,
    message: "Semester registration created successfully",
    data: result,
  });
});

const updateRegisteredSemester = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateRegisteredSemesterIntoDB(
      id,
      req.body,
    );
  sendResponse(res, {
    statuscode: 200,
    success: true,
    message: "Semester updated successfully",
    data: result,
  });
});

export const SemesterRegistrationController = {
  getAllRegisteredSemester,
  getSingleRegisteredSemester,
  createSemesterRegistration,
  updateRegisteredSemester,
};
