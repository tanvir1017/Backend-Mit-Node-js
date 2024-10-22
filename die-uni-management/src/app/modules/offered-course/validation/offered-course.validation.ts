import z from "zod";
import { daysEnum } from "../constant/offered-course.constant";

const timeStringValidation = z.string().refine(
  (time) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  },
  {
    message: "Invalid time format. Use HH:MM in 24 hours instead",
    path: ["startTime", "endTime"],
  },
);

const createOfferCourseValidation = z.object({
  body: z
    .object({
      //academicSemester: z.string(),
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...daysEnum] as [string, ...string[]])),
      startTime: timeStringValidation,
      endTime: timeStringValidation,
    })
    .refine(
      ({ startTime, endTime }) => {
        const stime = new Date(`1970-01-01T${startTime}:00`);
        const eTime = new Date(`1970-01-01T${endTime}:00`);
        return eTime > stime;
      },
      {
        message: "End time should be greater than start time",
        path: ["End Time", "Start Time"],
      },
    ),
});

const updateOfferCourseValidation = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...daysEnum] as [string, ...string[]])),
      startTime: timeStringValidation,
      endTime: timeStringValidation,
    })
    .refine(
      ({ startTime, endTime }) => {
        const stime = new Date(`1970-01-01T${startTime}:00`);
        const eTime = new Date(`1970-01-01T${endTime}:00`);
        return eTime > stime;
      },
      {
        message: "End time should be greater than start time",
        path: ["End Time", "Start Time"],
      },
    ),
});

export const OfferCourseValidationViaZod = {
  createOfferCourseValidation,
  updateOfferCourseValidation,
};
