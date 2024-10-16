import express from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { CourseControllers } from "../controller/course.controller";
import { CourseValidationViaZOD } from "../validation/course.validation";
const router = express.Router();

router.route("/all").get(CourseControllers.getAllCourses);
router
  .route("/create-course")
  .post(
    sanitizeClientDataViaZod(
      CourseValidationViaZOD.createCourseSchemaValidation,
    ),
    CourseControllers.createCourse,
  );

router
  .route("/:id/update")
  .patch(
    sanitizeClientDataViaZod(
      CourseValidationViaZOD.updateCourseSchemaValidation,
    ),
    CourseControllers.updateCourse,
  );

router.route("/:id/delete").delete(CourseControllers.deleteCourse);

router
  .route("/:courseId/assign-faculties")
  .put(
    sanitizeClientDataViaZod(CourseValidationViaZOD.facultiesWithCourse),
    CourseControllers.assignFaculties,
  );

router
  .route("/:courseId/remove-faculties")
  .delete(
    sanitizeClientDataViaZod(CourseValidationViaZOD.facultiesWithCourse),
    CourseControllers.removeFaculties,
  );

router.route("/course-faculties").get(CourseControllers.getAllFaculties);

router.route("/:id").get(CourseControllers.getSingleCourse);
const CourseRoutes = router;
export default CourseRoutes;
