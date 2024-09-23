import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

// create-student route
router.route("/create-student").post(StudentController.createStudent); // Type 1 that I like
// ? router.post("/create-student", StudentController.createStudent); // Type 2 that I like a bit

// get-students route
router.route("/").get(StudentController.getAllStudent); // Type 1 that I like

// get single student by id route
router.route("/:id").get(StudentController.getSingleStudentById); // Type 1 that I like

// delete single student by id
router
  .route("/:studentId/student-delete")
  .delete(StudentController.deleteStudentById); // Type 1 that I like

export const StudentsRoute = router;
