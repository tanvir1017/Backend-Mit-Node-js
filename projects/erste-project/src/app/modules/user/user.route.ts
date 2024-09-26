import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

// create-student route
router.route("/create-student").post(UserControllers.createStudent);

export const UserRoute = router;
