import express from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { OfferedCourseControllers } from "../controller/offered-course.controller";
import { OfferCourseValidationViaZod } from "../validation/offered-course.validation";

const router = express.Router();

router
  .route("/create")
  .post(
    sanitizeClientDataViaZod(
      OfferCourseValidationViaZod.createOfferCourseValidation,
    ),
    OfferedCourseControllers.createOfferedCourse,
  );

router.route("/all").get(OfferedCourseControllers.getAllOfferedCourses);

router.route("/:id").get(OfferedCourseControllers.getSingleOfferedCourse);

router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      OfferCourseValidationViaZod.updateOfferCourseValidation,
    ),
    OfferedCourseControllers.updateOfferedCourse,
  );

export const OfferedCourseRoutes = router;
