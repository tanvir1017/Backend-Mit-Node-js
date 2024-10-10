import express from "express";
import { FacultyControllers } from "../controller/faculty.controller";

const router = express.Router();

router.route("/").get(FacultyControllers.getAllFaculties);

router.route("/:facultyId").get(FacultyControllers.getSingleFaculty);

router.route("/:facultyId/delete").delete(FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
