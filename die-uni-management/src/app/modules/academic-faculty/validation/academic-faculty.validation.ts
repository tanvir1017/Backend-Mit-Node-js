import { z } from "zod";

const createAcademyFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty must be a string",
    }),
  }),
});

const updateAcademyFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty must be a string",
    }),
  }),
});

export const AcademicFacultyZOD = {
  createAcademyFacultyValidationSchema,
  updateAcademyFacultyValidationSchema,
};
