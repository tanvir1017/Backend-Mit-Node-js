import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthsName,
} from "../model/academicSemester.model";

// TODO => create validation schema for Academic Semester
const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
      message:
        "Name should following from this three fields 'Autumn', 'Summer', and 'Fall' ",
    }),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...MonthsName] as [string, ...string[]]),
    endMonth: z.enum([...MonthsName] as [string, ...string[]]),
  }),
});

// TODO => update validation schema for Academic Semester
const updateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterName] as [string, ...string[]], {
        message:
          "Name should following from this three fields 'Autumn', 'Summer', and 'Fall' ",
      })
      .optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...MonthsName] as [string, ...string[]]).optional(),
    endMonth: z.enum([...MonthsName] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidationZOD = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidation,
};
