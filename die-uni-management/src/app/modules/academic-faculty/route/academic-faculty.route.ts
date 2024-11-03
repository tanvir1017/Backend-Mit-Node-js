import express from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { AcademicFacultyControllers } from "../controller/academic-faculty.controller";
import { AcademicFacultyZOD } from "../validation/academic-faculty.validation";

const router = express.Router();

// TODO => Create a new academic faculty route
router
  .route("/create")
  .post(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      AcademicFacultyZOD.createAcademyFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
  );

// TODO => get all academic faculties
router
  .route("/all")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    AcademicFacultyControllers.getAllAcademicFaculties,
  );

// TODO => get all academic faculties
router
  .route("/:facultyID")

  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    AcademicFacultyControllers.getSingleAcademicFaculty,
  );

// TODO => update single academic faculties
router
  .route("/:facultyID/update")
  .patch(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      AcademicFacultyZOD.updateAcademyFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateSingleAcademicFaculty,
  );

export const AcademicFacultyRoutes = router;
