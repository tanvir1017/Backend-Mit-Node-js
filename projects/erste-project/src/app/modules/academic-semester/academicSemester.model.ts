import mongoose from "mongoose";
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from "./academicSemester.interface";

export const MonthsName: TMonths[] = [
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
];

const MonthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
    enum: {
      values: MonthsName,
      message: "{VALUE} is not a valid month",
    },
  },
});

const AcademicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];

const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

const AcademicSemesterSchema = new mongoose.Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: {
      values: AcademicSemesterName,
      message: "{VALUE} is not a valid semester name",
    },
  },
  year: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: {
      values: AcademicSemesterCode,
      message: "{VALUE} is not a valid semester code",
    },
  },
  startMonth: MonthSchema,
  endMonth: MonthSchema,
});

export const AcademicSemester = mongoose.model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema,
);
