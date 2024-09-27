import { z } from "zod";

const createAcademicSemesterValidation = z.object({
  name: z.enum(["Autumn", "Summer", "Fall"], {
    message:
      "Name should following from this three fields 'Autumn', 'Summer', and 'Fall' ",
  }),
  year: z.enum([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]),
  code: z.enum(["1", "2", "3"]),
  startMonth: z.enum(
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    {
      message: "Start month should following from this twelve fields",
    },
  ),
  endMonth: z.enum(
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    {
      message: "End month should following from this twelve fields",
    },
  ),
});

export const AcademicSemesterValidationZOD = {
  createAcademicSemesterValidation,
};
