import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { SemesterRegistrationController } from "../controller/semester-registration.controller";
import { SemesterRegistrationValidationViaZod } from "../validation/semester-registration.validation";

const router = Router();

router
  .route("/all")
  .get(SemesterRegistrationController.getAllRegisteredSemester);

router
  .route("/:id")
  .get(SemesterRegistrationController.getSingleRegisteredSemester);

router
  .route("/create")
  .post(
    sanitizeClientDataViaZod(
      SemesterRegistrationValidationViaZod.createSemesterRegistration,
    ),
    SemesterRegistrationController.createSemesterRegistration,
  );

/* router
  .route("/:id/delete")
  .delete(SemesterRegistrationController.deleteRegisteredSemester); */

router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      SemesterRegistrationValidationViaZod.updateSemesterRegistration,
    ),
    SemesterRegistrationController.updateRegisteredSemester,
  );

export const SemesterRegistrationRoutes = router;
