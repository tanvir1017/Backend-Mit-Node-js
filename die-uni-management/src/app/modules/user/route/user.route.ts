import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { FacultyValidationViaZod } from "../../faculty/validation/faculty.validation";
import { StudentValidationViaZOD } from "../../student/validation/student.validation";
import { UserControllers } from "../controller/user.controller";

const router = Router();

// create-student route
router
  .route("/create-student")
  .post(
    sanitizeClientDataViaZod(
      StudentValidationViaZOD.createStudentSchemaValidation,
    ),
    UserControllers.createStudent,
  );

router
  .route("/create-faculty")
  .post(
    sanitizeClientDataViaZod(
      FacultyValidationViaZod.createFacultyValidationSchema,
    ),
    UserControllers.createFaculty,
  );
export const UserRoutes = router;
