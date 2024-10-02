import express from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AcademicSemesterControllers } from "../controller/academicSemester.controller";
import { AcademicSemesterValidationZOD } from "../validation/academicSemester.validation";

const router = express.Router();

// TODO => Create a new academic Semester route
router.route("/create-academic-semester").post(
  // validator middleware called sanitizedClient
  sanitizeClientDataViaZod(
    AcademicSemesterValidationZOD.createAcademicSemesterValidation,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// TODO => get all academic semester route
router.route("/all").get(AcademicSemesterControllers.getallAcademicSemesters);

// TODO => get only single academic semester route
router
  .route("/:semesterID")
  .get(AcademicSemesterControllers.getSingleAcademicSemester);

// TODO => update academic semester route
router.route("/:semesterID/update-academic-semester").patch(
  // validator middleware called sanitizedClient
  sanitizeClientDataViaZod(
    AcademicSemesterValidationZOD.updateAcademicSemesterValidation,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
