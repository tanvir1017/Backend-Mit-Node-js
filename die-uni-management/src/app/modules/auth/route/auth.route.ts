import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { AuthController } from "../controller/auth.controller";
import { ValidateAuthUserViaZOD } from "../validation/auth.validation";

const router = Router();

router
  .route("/login")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.validateLoginUser),
    AuthController.loginValidation,
  );

router
  .route("/change-password")
  .post(
    authGuard(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.validatePreUser),
    AuthController.changePasswordValidation,
  );

export const AuthRoutes = router;
