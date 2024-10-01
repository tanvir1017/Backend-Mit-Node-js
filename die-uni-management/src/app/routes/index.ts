import { Router } from "express";
import { AcademicSemesterRoutes } from "../modules/academic-semester/route/academicSemester.route";
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
];

// TODO: Implement routes here
routesModule.forEach((route: TRouteModules) =>
  routes.use(route.path, route.routes),
);

export default routes;
