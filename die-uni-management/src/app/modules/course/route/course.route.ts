import express from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { CourseControllers } from "../controller/course.controller";
import { CourseValidationViaZOD } from "../validation/course.validation";
const router = express.Router();

router.route("/all").get(CourseControllers.getAllCourses);
router
  .route("/create-course")
  .post(
    authGuard(USER_ROLE.admin),
    sanitizeClientDataViaZod(
      CourseValidationViaZOD.createCourseSchemaValidation,
    ),
    CourseControllers.createCourse,
  );

router
  .route("/:id/update")
  .patch(
    authGuard("admin"),
    sanitizeClientDataViaZod(
      CourseValidationViaZOD.updateCourseSchemaValidation,
    ),
    CourseControllers.updateCourse,
  );

router
  .route("/:id/delete")
  .delete(authGuard("admin"), CourseControllers.deleteCourse);

router
  .route("/:courseId/assign-faculties")
  .put(
    authGuard("admin", "faculty"),
    sanitizeClientDataViaZod(CourseValidationViaZOD.facultiesWithCourse),
    CourseControllers.assignFaculties,
  );

router
  .route("/:courseId/remove-faculties")
  .delete(
    authGuard("admin"),
    sanitizeClientDataViaZod(CourseValidationViaZOD.facultiesWithCourse),
    CourseControllers.removeFaculties,
  );

router
  .route("/course-faculties")
  .get(
    authGuard("admin", "student", "faculty"),
    CourseControllers.getAllFaculties,
  );

router
  .route("/:id")
  .get(
    authGuard("admin", "student", "faculty"),
    CourseControllers.getSingleCourse,
  );
const CourseRoutes = router;
export default CourseRoutes;
