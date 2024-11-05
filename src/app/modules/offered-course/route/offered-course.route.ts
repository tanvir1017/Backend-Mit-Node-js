import express from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { OfferedCourseControllers } from "../controller/offered-course.controller";
import { OfferCourseValidationViaZod } from "../validation/offered-course.validation";

const router = express.Router();

router
  .route("/create")
  .post(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      OfferCourseValidationViaZod.createOfferCourseValidation,
    ),
    OfferedCourseControllers.createOfferedCourse,
  );

router
  .route("/all")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    OfferedCourseControllers.getAllOfferedCourses,
  );
router
  .route("/my-courses")
  .get(
    authGuard(USER_ROLE.student),
    OfferedCourseControllers.getMyOfferedCourse,
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
    OfferedCourseControllers.getSingleOfferedCourse,
  );

router
  .route("/:id/update")
  .patch(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      OfferCourseValidationViaZod.updateOfferCourseValidation,
    ),
    OfferedCourseControllers.updateOfferedCourse,
  );

export const OfferedCourseRoutes = router;
