import { Router } from "express";
import { AcademicDepartRoutes } from "../modules/academic-department/route/academic-department.route";
import { AcademicFacultyRoutes } from "../modules/academic-faculty/route/academic-faculty.route";
import { AcademicSemesterRoutes } from "../modules/academic-semester/route/academicSemester.route";
import { AdminRoutes } from "../modules/admin/route/admin.route";
import { AuthRoutes } from "../modules/auth/route/auth.route";
import CourseRoutes from "../modules/course/route/course.route";
import { FacultyRoutes } from "../modules/faculty/route/faculty.route";
import { OfferedCourseRoutes } from "../modules/offered-course/route/offered-course.route";
import { SemesterRegistrationRoutes } from "../modules/semester-registration/route/semester-registration.route";
import { StudentsRoutes } from "../modules/student/route/student.route";
import { UserRoutes } from "../modules/user/route/user.route";

const routes = Router();

// TODO  => All Router

type TRouteModules = { path: string; routes: Router };

const routesModule: TRouteModules[] = [
  {
    path: "/users",
    routes: UserRoutes,
  },
  {
    path: "/student",
    routes: StudentsRoutes,
  },
  {
    path: "/academic-semester",
    routes: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    routes: AcademicFacultyRoutes,
  },
  {
    path: "/academic-departments",
    routes: AcademicDepartRoutes,
  },
  {
    path: "/faculties",
    routes: FacultyRoutes,
  },
  {
    path: "/admins",
    routes: AdminRoutes,
  },
  {
    path: "/courses",
    routes: CourseRoutes,
  },
  {
    path: "/semester-registration",
    routes: SemesterRegistrationRoutes,
  },
  {
    path: "/offered-courses",
    routes: OfferedCourseRoutes,
  },
  {
    path: "/auth",
    routes: AuthRoutes,
  },
];

// TODO: Implement routes here
routesModule.forEach((route: TRouteModules) =>
  routes.use(route.path, route.routes),
);

export default routes;
