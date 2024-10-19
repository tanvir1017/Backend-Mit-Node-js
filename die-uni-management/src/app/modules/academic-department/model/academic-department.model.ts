import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import { TAcademicDepartment } from "../interface/academic-department.interface";

const academicDepartmentSchema = new mongoose.Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// TODO => perform some operations here before saving the document to the database
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(500, "Department already exists");
  }

  next();
});

// TODO => perform query operations here before updating the document from the database
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isDocExistByID = await AcademicDepartment.findOne(query);
  if (!isDocExistByID) {
    throw new AppError(404, "Department doesn't exists!!");
  }

  next();
});

export const AcademicDepartment = mongoose.model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema,
);
