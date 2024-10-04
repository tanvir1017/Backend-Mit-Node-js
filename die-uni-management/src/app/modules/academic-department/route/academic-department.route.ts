import { Router } from "express";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
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
