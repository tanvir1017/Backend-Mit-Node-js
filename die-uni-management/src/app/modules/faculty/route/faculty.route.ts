import express from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { FacultyControllers } from "../controller/faculty.controller";
import { FacultyValidationViaZod } from "../validation/faculty.validation";

const router = express.Router();

router.route("/").get(FacultyControllers.getAllFaculties);

router.route("/:id").get(FacultyControllers.getSingleFaculty);

router.route("/:id/delete").delete(FacultyControllers.deleteFaculty);

router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      FacultyValidationViaZod.updateFacultyValidationSchema,
    ),
    FacultyControllers.updateFaculty,
  );

export const FacultyRoutes = router;
