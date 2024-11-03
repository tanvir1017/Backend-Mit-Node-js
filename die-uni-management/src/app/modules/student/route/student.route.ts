import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { StudentController } from "../controller/student.controller";
import { StudentValidationViaZOD } from "../validation/student.validation";

const router = Router();

// get-students route
router
  .route("/all")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    StudentController.getAllStudent,
  ); // Type 1 that I like

// get single student by id route
router
  .route("/:id")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    StudentController.getSingleStudentById,
  ); // Type 1 that I like

// delete single student by id
router
  .route("/:id/delete")
  .delete(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    StudentController.deleteStudentById,
  ); // Type 1 that I like

// update single student by id
router
  .route("/:id/update")
  .patch(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      StudentValidationViaZOD.updateStudentSchemaValidation,
    ),
    StudentController.updateStudent,
  ); // Type 1 that I like

export const StudentsRoutes = router;
