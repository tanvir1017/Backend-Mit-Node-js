import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
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

export const UserRoutes = router;
