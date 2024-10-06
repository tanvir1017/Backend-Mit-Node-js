import { Router } from "express";
import { StudentController } from "../controller/student.controller";

const router = Router();

// get-students route
router.route("/all").get(StudentController.getAllStudent); // Type 1 that I like

// get single student by id route
router.route("/:studentId").get(StudentController.getSingleStudentById); // Type 1 that I like

// delete single student by id
router.route("/:studentId/delete").patch(StudentController.deleteStudentById); // Type 1 that I like

// update single student by id
router.route("/:studentId/update").patch(StudentController.updateStudent); // Type 1 that I like

export const StudentsRoutes = router;
