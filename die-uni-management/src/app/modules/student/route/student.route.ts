import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { StudentController } from "../controller/student.controller";
import { StudentValidationViaZOD } from "../validation/student.validation";

const router = Router();

// get-students route
router.route("/all").get(StudentController.getAllStudent); // Type 1 that I like

// get single student by id route
router
  .route("/:id")
  .get(
    authGuard("admin", "faculty", "student"),
    StudentController.getSingleStudentById,
  ); // Type 1 that I like

// delete single student by id
router.route("/:id/delete").delete(StudentController.deleteStudentById); // Type 1 that I like

// update single student by id
router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      StudentValidationViaZOD.updateStudentSchemaValidation,
    ),
    StudentController.updateStudent,
  ); // Type 1 that I like

export const StudentsRoutes = router;
