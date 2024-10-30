import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AdminValidationViaZod } from "../../admin/validation/admin.validation";
import { FacultyValidationViaZod } from "../../faculty/validation/faculty.validation";
import { StudentValidationViaZOD } from "../../student/validation/student.validation";
import { USER_ROLE } from "../constant/user.constant";
import { UserControllers } from "../controller/user.controller";

const router = Router();

// TODO => create student
router
  .route("/create-student")
  .post(
    authGuard(USER_ROLE.admin),
    sanitizeClientDataViaZod(
      StudentValidationViaZOD.createStudentSchemaValidation,
    ),
    UserControllers.createStudent,
  );

// TODO => Create an faculty
router
  .route("/create-faculty")
  .post(
    authGuard(USER_ROLE.admin, USER_ROLE.faculty),
    sanitizeClientDataViaZod(
      FacultyValidationViaZod.createFacultyValidationSchema,
    ),
    UserControllers.createFaculty,
  );

// TODO => Create an admin
router.route("/create-admin").post(
  //authGuard(USER_ROLE.admin),
  sanitizeClientDataViaZod(AdminValidationViaZod.createAdminValidationSchema),
  UserControllers.createAdmin,
);

// TODO => Find only yourself
router
  .route("/me")
  .get(authGuard("student", "faculty", "admin"), UserControllers.getMe);

// TODO => change user status
router
  .route("/:id/change-status")
  .post(authGuard("admin"), UserControllers.changeStatus);

export const UserRoutes = router;
