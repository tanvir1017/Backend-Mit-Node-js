import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AdminValidationViaZod } from "../../admin/validation/admin.validation";
import { FacultyValidationViaZod } from "../../faculty/validation/faculty.validation";
import { StudentValidationViaZOD } from "../../student/validation/student.validation";
import { USER_ROLE } from "../constant/user.constant";
import { UserControllers } from "../controller/user.controller";

const router = Router();

// create-student route
router
  .route("/create-student")
  .post(
    authGuard(USER_ROLE.admin),
    sanitizeClientDataViaZod(
      StudentValidationViaZOD.createStudentSchemaValidation,
    ),
    UserControllers.createStudent,
  );

router
  .route("/create-faculty")
  .post(
    authGuard(USER_ROLE.admin),
    sanitizeClientDataViaZod(
      FacultyValidationViaZod.createFacultyValidationSchema,
    ),
    UserControllers.createFaculty,
  );

router
  .route("/create-admin")
  .post(
    authGuard(USER_ROLE.admin),
    sanitizeClientDataViaZod(AdminValidationViaZod.createAdminValidationSchema),
    UserControllers.createAdmin,
  );
export const UserRoutes = router;
