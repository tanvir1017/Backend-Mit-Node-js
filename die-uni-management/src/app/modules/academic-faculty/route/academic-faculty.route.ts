import express from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AcademicFacultyControllers } from "../controller/academic-faculty.controller";
import { AcademicFacultyZOD } from "../validation/academic-faculty.validation";

const router = express.Router();

// TODO => Create a new academic faculty route
router
  .route("/create")
  .post(
    sanitizeClientDataViaZod(
      AcademicFacultyZOD.createAcademyFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
  );

// TODO => get all academic faculties
router.route("/all").get(AcademicFacultyControllers.getAllAcademicFaculties);

// TODO => get all academic faculties
router
  .route("/:facultyID")
  .get(AcademicFacultyControllers.getSingleAcademicFaculty);

// TODO => update single academic faculties
router
  .route("/:facultyID/update")
  .patch(
    sanitizeClientDataViaZod(
      AcademicFacultyZOD.updateAcademyFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateSingleAcademicFaculty,
  );

export const AcademicFacultyRoutes = router;
