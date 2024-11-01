import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { EnrolledCourseControllers } from "../controller/enrolled-course.controller";
import { EnrolledCourseValidationViaZOD } from "../validation/enrolled-course.validation";

const router = Router();

router
  .route("/create")
  .post(
    authGuard(USER_ROLE.student),
    sanitizeClientDataViaZod(
      EnrolledCourseValidationViaZOD.createEnrolledCourseValidationSchema,
    ),
    EnrolledCourseControllers.createEnrolledCourse,
  );

export const EnrolledCourseRoutes = router;
