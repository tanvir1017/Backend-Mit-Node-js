import { Router } from "express";
import sanitizeClientDataViaZod from "../../middleware/sanitizeClientDataViaZod";
import { StudentValidationViaZOD } from "../student/student.validation";
import { UserControllers } from "./user.controller";

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

export const UserRoute = router;
