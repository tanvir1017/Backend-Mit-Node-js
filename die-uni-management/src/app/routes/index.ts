import { Router } from "express";
import { StudentsRoutes } from "../modules/student/student.route";
import { UserRoute } from "../modules/user/user.route";

const routes = Router();

// TODO  => All Router

type TRouteModules = { path: string; cbf: Router };

const routesModule: TRouteModules[] = [
  {
    path: "/users",
    cbf: UserRoute,
  },
  {
    path: "/student",
    cbf: StudentsRoutes,
  },
];

// TODO: Implement routes here
routesModule.forEach((route: TRouteModules) =>
  routes.use(route.path, route.cbf),
);

export default routes;
