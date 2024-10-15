import { z } from "zod";

const PreRequisiteCourseSchemaValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string().trim(),
    prefix: z.string().trim(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(PreRequisiteCourseSchemaValidation).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string().trim().optional(),
    prefix: z.string().trim().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(PreRequisiteCourseSchemaValidation).optional(),
    isDeleted: z.boolean().optional().optional(),
  }),
});

export const CourseValidationViaZOD = {
  createCourseSchemaValidation,
  updateCourseSchemaValidation,
};
