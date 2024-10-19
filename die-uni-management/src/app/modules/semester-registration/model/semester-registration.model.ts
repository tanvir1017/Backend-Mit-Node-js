import mongoose from "mongoose";
import { SEMESTER_REGISTRATION_STATUS } from "../constant/semester-registration.constant";
import { TSemesterRegistration } from "../interface/semester-registration.interface";

const SemesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    status: {
      type: String,
      enum: SEMESTER_REGISTRATION_STATUS,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistrationModel = mongoose.model<TSemesterRegistration>(
  "SemesterRegistration",
  SemesterRegistrationSchema,
);
