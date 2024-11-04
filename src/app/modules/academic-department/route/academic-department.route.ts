import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { USER_ROLE } from "../../user/constant/user.constant";
import { AcademicDepartmentControllers } from "../controller/academic-department.controller";
import { AcademicDepartmentValidationViaZOD } from "../validation/academic-department.validation";

const router = Router();

router
  .route("/all")
  .get(AcademicDepartmentControllers.getAllAcademicDepartments);

router
  .route("/:academicDepartmentID")
  .get(AcademicDepartmentControllers.getSingleAcademicDepartment);

router
  .route("/create")
  .post(
    authGuard(USER_ROLE.superAdmin, USER_ROLE.admin),
    sanitizeClientDataViaZod(
      AcademicDepartmentValidationViaZOD.createAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.createAcademicDepartment,
  );

router
  .route("/:academicDepartmentID/update")
  .patch(
    sanitizeClientDataViaZod(
      AcademicDepartmentValidationViaZOD.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDepartment,
  );

export const AcademicDepartRoutes = router;
