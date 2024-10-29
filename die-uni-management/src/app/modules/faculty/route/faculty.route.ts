import express from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { FacultyControllers } from "../controller/faculty.controller";
import { FacultyValidationViaZod } from "../validation/faculty.validation";

const router = express.Router();

router
  .route("/all")
  .get(
    authGuard(USER_ROLE.admin, USER_ROLE.faculty),
    FacultyControllers.getAllFaculties,
  );

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
