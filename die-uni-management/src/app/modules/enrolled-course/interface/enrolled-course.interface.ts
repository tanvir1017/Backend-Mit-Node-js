import { Types } from "mongoose";

export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalExam: number;
};

export type TGrade = "A" | "B" | "C" | "D" | "E" | "F" | "N/A";

export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  student: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: TGrade;
  gradPoints: number;
  isCompleted: boolean;
};
