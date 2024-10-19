import { z } from "zod";
import { SEMESTER_REGISTRATION_STATUS } from "../constant/semester-registration.constant";

const createSemesterRegistration = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...SEMESTER_REGISTRATION_STATUS] as [string, ...string[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().int().positive().optional(),
    maxCredit: z.number().int().positive().optional(),
  }),
});

const updateSemesterRegistration = z.object({
  body: z
    .object({
      academicSemester: z.string().optional(),
      status: z
        .enum([...SEMESTER_REGISTRATION_STATUS] as [string, ...string[]])
        .optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      minCredit: z.number().int().positive().optional().optional(),
      maxCredit: z.number().int().positive().optional().optional(),
    })
    .strict(),
});

export const SemesterRegistrationValidationViaZod = {
  createSemesterRegistration,
  updateSemesterRegistration,
};
