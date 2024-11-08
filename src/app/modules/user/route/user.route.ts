import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import { upload } from "../../../middleware/multer";
import parseBodyData from "../../../middleware/parse-bodyData";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AdminValidationViaZod } from "../../admin/validation/admin.validation";
import { FacultyValidationViaZod } from "../../faculty/validation/faculty.validation";
import { StudentValidationViaZOD } from "../../student/validation/student.validation";
import { USER_ROLE } from "../constant/user.constant";
import { UserControllers } from "../controller/user.controller";

const router = Router();

// TODO => create student
router.route("/create-student").post(
  // ? Authguard will authorize user role
  authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
  // ? upload the file via multer to /public/uploads folder for temporary basis
  upload.single("file"),
  // ? will parse the for data into Json
  parseBodyData(),
  // ? data validation via zod
  sanitizeClientDataViaZod(
    StudentValidationViaZOD.createStudentSchemaValidation,
  ),
  // ? route controller and so on....
  UserControllers.createStudent,
);

// TODO => Create an faculty
router.route("/create-faculty").post(
  authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  // ? upload the file via multer to /public/uploads folder for temporary basis
  upload.single("file"),
  // ? will parse the for data into Json
  parseBodyData(),
  // ? data validation via zod
  sanitizeClientDataViaZod(
    FacultyValidationViaZod.createFacultyValidationSchema,
  ),
  UserControllers.createFaculty,
);

// TODO => Create an admin
router.route("/create-admin").post(
  authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
  // ? upload the file via multer to /public/uploads folder for temporary basis
  upload.single("file"),
  // ? will parse the for data into Json
  parseBodyData(),
  // ? data validation via zod
  sanitizeClientDataViaZod(AdminValidationViaZod.createAdminValidationSchema),
  UserControllers.createAdmin,
);

// TODO => Find only yourself
router
  .route("/me")
  .get(
    authGuard(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.student,
      USER_ROLE.faculty,
    ),
    UserControllers.getMe,
  );

// TODO => change user status
router
  .route("/:id/change-status")
  .post(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    UserControllers.changeStatus,
  );

export const UserRoutes = router;
