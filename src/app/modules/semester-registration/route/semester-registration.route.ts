import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { SemesterRegistrationController } from "../controller/semester-registration.controller";
import { SemesterRegistrationValidationViaZod } from "../validation/semester-registration.validation";

const router = Router();

router
  .route("/all")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    SemesterRegistrationController.getAllRegisteredSemester,
  );

router
  .route("/:id")

  .get(
    authGuard(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
    ),
    SemesterRegistrationController.getSingleRegisteredSemester,
  );

router
  .route("/create")
  .post(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      SemesterRegistrationValidationViaZod.createSemesterRegistration,
    ),
    SemesterRegistrationController.createSemesterRegistration,
  );

router
  .route("/:id/delete")
  .delete(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    SemesterRegistrationController.deleteSemesterRegistration,
  );

router
  .route("/:id/update")
  .patch(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      SemesterRegistrationValidationViaZod.updateSemesterRegistration,
    ),
    SemesterRegistrationController.updateRegisteredSemester,
  );

export const SemesterRegistrationRoutes = router;
