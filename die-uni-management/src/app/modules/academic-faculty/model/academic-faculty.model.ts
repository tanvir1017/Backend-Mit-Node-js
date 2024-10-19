import mongoose from "mongoose";
import { TAcademicFaculty } from "../interface/academic-faculty.interface";

const AcademicFacultySchema = new mongoose.Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = mongoose.model<TAcademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema,
);
