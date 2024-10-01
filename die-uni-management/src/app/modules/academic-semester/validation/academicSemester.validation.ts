import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthsName,
} from "../model/academicSemester.model";

const createAcademicSemesterValidation = z.object({
  name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
    message:
      "Name should following from this three fields 'Autumn', 'Summer', and 'Fall' ",
  }),
  year: z.string(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...MonthsName] as [string, ...string[]]),
  endMonth: z.enum([...MonthsName] as [string, ...string[]]),
});

export const AcademicSemesterValidationZOD = {
  createAcademicSemesterValidation,
};
