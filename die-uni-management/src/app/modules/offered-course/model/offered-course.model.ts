import { model, Schema, Types } from "mongoose";

// Define the schema for Days
const daysEnum = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

// Define the schema for OfferCourse
const offerCourseSchema = new Schema({
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
  course: { type: Types.ObjectId, ref: "Course", required: true },
  faculty: { type: Types.ObjectId, ref: "Faculty", required: true },
  maxCapacity: { type: Number, required: true },
  section: { type: Number, required: true },
  days: { type: String, enum: daysEnum, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

// Create and export the model
const OfferCourse = model("OfferCourse", offerCourseSchema);

export default OfferCourse;
