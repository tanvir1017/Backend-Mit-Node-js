import express from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { CourseControllers } from "../controller/course.controller";
import { CourseValidationViaZOD } from "../validation/course.validation";
const router = express.Router();

router
  .route("/all")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    CourseControllers.getAllCourses,
  );
router
  .route("/create-course")
  .post(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      CourseValidationViaZOD.createCourseSchemaValidation,
    ),
    CourseControllers.createCourse,
  );

router
  .route("/:id/update")
  .patch(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      CourseValidationViaZOD.updateCourseSchemaValidation,
    ),
    CourseControllers.updateCourse,
  );

router
  .route("/:id/delete")
  .delete(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    CourseControllers.deleteCourse,
  );

router
  .route("/:courseId/assign-faculties")
  .put(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    sanitizeClientDataViaZod(CourseValidationViaZOD.facultiesWithCourse),
    CourseControllers.assignFaculties,
  );

router
  .route("/:courseId/get-faculties")
  .get(
    authGuard(
      USER_ROLE.superAdmin,
      USER_ROLE.admin,
      USER_ROLE.faculty,
      USER_ROLE.student,
    ),
    CourseControllers.getFacultiesWithCourse,
  );

router
  .route("/:courseId/remove-faculties")
  .delete(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(CourseValidationViaZOD.facultiesWithCourse),
    CourseControllers.removeFaculties,
  );

router
  .route("/course-faculties")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    CourseControllers.getAllFaculties,
  );

router
  .route("/:id")
  .get(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    CourseControllers.getSingleCourse,
  );
const CourseRoutes = router;
export default CourseRoutes;
