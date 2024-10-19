import mongoose from "mongoose";
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
} from "../interface/academicSemester.interface";

export const MonthsName: string[] = [
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

export const AcademicSemesterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

const AcademicSemesterSchema = new mongoose.Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: {
        values: AcademicSemesterName,
        message: "{VALUE} is not a valid semester name",
      },
    },
    year: {
      type: String,
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
    startMonth: {
      type: String,
      required: true,
      enum: {
        values: MonthsName,
        message: "{VALUE} is not a valid month",
      },
    },
    endMonth: {
      type: String,
      required: true,
      enum: {
        values: MonthsName,
        message: "{VALUE} is not a valid month",
      },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Checks if a semester with the same name and year already exists in the database before saving a new semester.
 *
 * @param {Function} next - The next middleware function in the chain.
 * @returns {Promise<void>} - Resolves when the check is completed.
 * @throws {Error} - Throws an error if a semester with the same name and year already exists.
 */
AcademicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new Error("Semester already exists");
  }

  next(); // From express
});

export const AcademicSemester = mongoose.model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema,
);
