import mongoose, { Schema } from "mongoose";
import AppError from "../../../errors/appError";
import { AcademicDepartment } from "../../academic-department/model/academic-department.model";
import { AcademicFaculty } from "../../academic-faculty/model/academic-faculty.model";
import { CourseModel } from "../../course/model/course.model";
import { FacultyModel } from "../../faculty/model/faculty.model";
import { SemesterRegistrationModel } from "../../semester-registration/model/semester-registration.model";
import { TOfferCourse } from "../interface/offered-course.interface";
import OfferCourseModel from "../model/offered-course.model";

const validateByDbQuery = async <T>(
  model: mongoose.Model<T>,
  id: Schema.Types.ObjectId,
) => {
  const result = await model.findById(id);
  return result;
};

const createOfferedCourseIntoDB = async (payload: TOfferCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  //* check if the semester registration id is exists!
  const isSemesterRegistrationIdExist = await validateByDbQuery(
    SemesterRegistrationModel,
    semesterRegistration,
  );

  if (!isSemesterRegistrationIdExist)
    throw new AppError(400, "Semester doesn't registered");

  const academicSemester = isSemesterRegistrationIdExist.academicSemester;

  //* check academic faculty id exist
  const isAcademicFacultyIdExist = await validateByDbQuery(
    AcademicFaculty,
    academicFaculty,
  );

  if (!isAcademicFacultyIdExist)
    throw new AppError(400, "Academic Faculty doesn't exist");

  //* check academic department id exist
  const isAcademicDepartmentIdExist = await validateByDbQuery(
    AcademicDepartment,
    academicDepartment,
  );

  if (!isAcademicDepartmentIdExist)
    throw new AppError(400, "Academic Department doesn't exist");

  //* check course id exist
  const isCourseIdExist = await validateByDbQuery(CourseModel, course);

  if (!isCourseIdExist) throw new AppError(400, "Course doesn't exist");

  //* check Faculty id exist
  const isFacultyIdExist = await validateByDbQuery(FacultyModel, faculty);

  if (!isFacultyIdExist) throw new AppError(400, "Faculty doesn't exist");

  const result = await OfferCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferCourse>,
) => {};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseFromDB = async (id: string) => {};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
};
