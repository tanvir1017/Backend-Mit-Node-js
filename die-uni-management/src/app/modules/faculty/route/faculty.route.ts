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

router
  .route("/:id")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    FacultyControllers.getSingleFaculty,
  );

router
  .route("/:id/delete")
  .delete(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    FacultyControllers.deleteFaculty,
  );

router
  .route("/:id/update")
  .patch(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      FacultyValidationViaZod.updateFacultyValidationSchema,
    ),
    FacultyControllers.updateFaculty,
  );

export const FacultyRoutes = router;
