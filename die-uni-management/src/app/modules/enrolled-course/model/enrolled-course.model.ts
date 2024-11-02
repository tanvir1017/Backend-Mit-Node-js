import mongoose from "mongoose";
import { Grade } from "../constant/enrolled-course.constant";
import {
  TCourseMarks,
  TEnrolledCourse,
} from "../interface/enrolled-course.interface";

const courseMarksSchema = new mongoose.Schema<TCourseMarks>(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    midTerm: {
      type: Number,
      min: 0,
      max: 30,
      default: 0,
    },
    classTest2: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    finalExam: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const enrolledCourseMongooseSchema = new mongoose.Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SemesterRegistration",
    required: true,
  },
  academicSemester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicSemester",
    required: true,
  },
  academicDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicDepartment",
    required: true,
  },
  academicFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: true,
  },
  offeredCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OfferedCourse",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  grade: {
    type: String,
    enum: Grade,
    default: "N/A",
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const EnrolledCourseModel = mongoose.model<TEnrolledCourse>(
  "EnrolledCourse",
  enrolledCourseMongooseSchema,
);
export default EnrolledCourseModel;
