import { Schema } from "mongoose";

export type TDays = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TOfferCourse = {
  semesterRegistration: Schema.Types.ObjectId;
  academicSemester?: Schema.Types.ObjectId;
  academicFaculty: Schema.Types.ObjectId;
  academicDepartment: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  faculty: Schema.Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};
