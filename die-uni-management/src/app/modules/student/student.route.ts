import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

// get-students route
router.route("/").get(StudentController.getAllStudent); // Type 1 that I like

// get single student by id route
router.route("/:id").get(StudentController.getSingleStudentById); // Type 1 that I like

// delete single student by id
router
  .route("/:studentId/student-delete")
  .delete(StudentController.deleteStudentById); // Type 1 that I like

// update single student by id
router.route("/:studentId/student-update").put(StudentController.updateStudent); // Type 1 that I like

export const StudentsRoutes = router;
