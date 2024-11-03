import express from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
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
router
  .route("/all")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    AcademicSemesterControllers.getallAcademicSemesters,
  );

// TODO => get only single academic semester route
router
  .route("/:semesterID")

  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    AcademicSemesterControllers.getSingleAcademicSemester,
  );

// TODO => update academic semester route
router.route("/:semesterID/update-academic-semester").patch(
  authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
  // validator middleware called sanitizedClient
  sanitizeClientDataViaZod(
    AcademicSemesterValidationZOD.updateAcademicSemesterValidation,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
