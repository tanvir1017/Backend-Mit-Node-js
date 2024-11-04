import mongoose, { Types } from "mongoose";
import { daysEnum } from "../constant/offered-course.constant";
import { TOfferCourse } from "../interface/offered-course.interface";

// Define the schema for OfferCourse
const offerCourseSchema = new mongoose.Schema<TOfferCourse>(
  {
    semesterRegistration: {
      type: Types.ObjectId,
      ref: "SemesterRegistration",
      required: true,
    },
    academicSemester: {
      type: Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    academicDepartment: {
      type: Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    course: {
      type: Types.ObjectId,
      ref: "Course",
      required: true,
    },
    faculty: {
      type: Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: [
      {
        type: String,
        enum: daysEnum,
        required: true,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the model
const OfferCourseModel = mongoose.model<TOfferCourse>(
  "OfferCourse",
  offerCourseSchema,
);

export default OfferCourseModel;
