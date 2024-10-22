import mongoose, { Schema } from "mongoose";
import AppError from "../../../errors/appError";
import { AcademicDepartment } from "../../academic-department/model/academic-department.model";
import { AcademicFaculty } from "../../academic-faculty/model/academic-faculty.model";
import { CourseModel } from "../../course/model/course.model";
import { FacultyModel } from "../../faculty/model/faculty.model";
import { SemesterRegistrationModel } from "../../semester-registration/model/semester-registration.model";
import { TOfferCourse } from "../interface/offered-course.interface";
import OfferCourseModel from "../model/offered-course.model";
import { OfferedCourseUtils } from "../utils/offered-course.utils";

/**
 *
 * @param model
 * @param id
 * @returns if data found true nor null
 */
const validateByDbQuery = async <T>(
  model: mongoose.Model<T>,
  id: string | Schema.Types.ObjectId,
) => {
  const result = await model.findById(id);
  return result;
};

// TODO => Create offered course
const createOfferedCourseIntoDB = async (payload: TOfferCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
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
  const isFacultyExist = await validateByDbQuery(FacultyModel, faculty);

  if (!isFacultyExist) throw new AppError(400, "Faculty doesn't exist");

  //* check if academicFaculty belongs to academicDepartment
  const isAFacultyBelongsToADepartment = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isAFacultyBelongsToADepartment)
    throw new AppError(
      400,
      `The ${isAcademicDepartmentIdExist.name} doesn't belongs to the ${isAcademicFacultyIdExist.name}`,
    );

  //* check if the same offered course same section in same registered semester exists
  const ifSameOfferedCourseSameSectionInSameRegisteredSemester =
    await OfferCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (ifSameOfferedCourseSameSectionInSameRegisteredSemester)
    throw new AppError(
      400,
      "Offered course with same section is already exist!",
    );

  //* check if the same faculty running same section in same offered course!
  const assignedSchedules = await OfferCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime"); // only select `days startTime endTime`

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (OfferedCourseUtils.hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      409,
      "Same faculty can't have same course at same day on same time!",
    );
  }
  const result = await OfferCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

// TODO => Update offered course
const updateOfferedCourseIntoDB = async (
  id: string | Schema.Types.ObjectId,
  payload: Pick<TOfferCourse, "faculty" | "days" | "startTime" | "endTime">,
) => {
  const { faculty, days, startTime, endTime } = payload;

  //* check id is found or not
  const isOfferedCourseExist = await validateByDbQuery(OfferCourseModel, id);
  if (!isOfferedCourseExist)
    throw new AppError(400, "Offered course not found");

  //* check faculty exist or not
  const isFacultyExist = await validateByDbQuery(
    FacultyModel,
    faculty as Schema.Types.ObjectId,
  );
  if (!isFacultyExist) throw new AppError(400, "Faculty does not exist");

  //* finding out semester registration
  const offeredCourse = await OfferCourseModel.findById(id);
  const semesterRegistration = offeredCourse?.semesterRegistration;

  //* update only if the offered course in UPCOMING status
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (
    semesterRegistrationStatus &&
    semesterRegistrationStatus.status !== "UPCOMING"
  ) {
    throw new AppError(400, "Update available only UPCOMING semester!");
  }

  //* check if the same faculty running same section in same offered course!
  const assignedSchedules = await OfferCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime"); // only select `days startTime endTime`

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (OfferedCourseUtils.hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      409,
      "Same faculty can't have same course at same day on same time!",
    );
  }

  const result = await OfferCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// TODO => Get all offered Courses
const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const result = await OfferCourseModel.find();

  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
};
