import { StatusCodes as httpStatus } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import { CourseModel } from "../../course/model/course.model";
import { FacultyModel } from "../../faculty/model/faculty.model";
import OfferCourseModel from "../../offered-course/model/offered-course.model";
import { SemesterRegistrationModel } from "../../semester-registration/model/semester-registration.model";
import StudentModel from "../../student/model/student.model";
import { TEnrolledCourse } from "../interface/enrolled-course.interface";
import EnrolledCourseModel from "../model/enrolled-course.model";

const createEnrolledCourseIntoDB = async (
  user: JwtPayload,
  payload: { offeredCourse: string },
) => {
  /**
   * Validation and Business logic
   *  Step 01. Check if the offered course is exist
   *  Step 02. Check if the student is already enrolled in that particular course
   *  Step 03. create an enrolled course
   *  Step 04. decrement max capacity from offeredCourse
   */

  const { offeredCourse } = payload;

  //** getting the user data by userId from payload
  const student = await StudentModel.findOne({ id: user.userId }, { _id: 1 });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  //* Step 01. Checking if the offered course exist
  const isOfferedCourseExist = await OfferCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Offered Course does not exist");
  }

  // Destructuring from offeredcourse
  const {
    semesterRegistration,
    academicSemester,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    _id: offeredCourseId,
  } = isOfferedCourseExist;

  //** checking  course capacity
  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Unfortunately, room capacity is full!",
    );
  }

  //* Step 02. checking if the student already enrolled the course
  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse,
    student,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Student is already enrolled in this course",
    );
  }

  //
  const courseCredits = await CourseModel.findById(course, {
    _id: false,
    credits: true,
  });

  //* check total credits is it exceeds maxCredit
  const isSemesterRegistrationExceed = await SemesterRegistrationModel.findById(
    semesterRegistration,
    { maxCredit: 1 },
  );

  //* check enrolled course total credits
  const enrolledCourses = await EnrolledCourseModel.aggregate([
    {
      $match: {
        semesterRegistration,
        student: student._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "enrolledCourse",
      },
    },
    {
      $unwind: "$enrolledCourse",
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: "$enrolledCourse.credits" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  //* calculating total credits
  const totalCourse =
    courseCredits &&
    enrolledCourses.length &&
    courseCredits.credits + enrolledCourses[0].totalEnrolledCredits;

  //* if its exceeded, then
  if (
    isSemesterRegistrationExceed &&
    isSemesterRegistrationExceed.maxCredit < totalCourse
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Total credits exceeded maximum credit allowed in the semester",
    );
  }

  //* Starting mongoose session
  const session = await mongoose.startSession();

  try {
    // starting session transaction
    session.startTransaction();
    //* Step 03. creating enrolled course
    const result = await EnrolledCourseModel.create(
      [
        {
          semesterRegistration,
          academicSemester,
          academicDepartment,
          academicFaculty,
          offeredCourse: offeredCourseId,
          course,
          student: student._id,
          faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );
    if (!result.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to enroll in this course!",
      );
    }
    //* Step 04. decrement max capacity from offeredCourse
    await OfferCourseModel.findByIdAndUpdate(
      offeredCourseId,
      { maxCapacity: Number(isOfferedCourseExist.maxCapacity) - 1 },
      { session, new: true, runValidators: true },
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const updateEnrolledCourseMarksIntoDB = async (
  faculty: JwtPayload,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExist =
    await SemesterRegistrationModel.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester registration not found");
  }

  //** checking is student exist or not
  const isStudentExist = await StudentModel.findById(student);
  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  //**  Checking if the offered course exist
  const isOfferedCourseExist = await OfferCourseModel.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Offered Course does not exist");
  }

  //**  Checking if the faculty exist or not
  const getFacultyByTokenUserId = await FacultyModel.findOne(
    {
      id: faculty.userId,
    },
    { _id: true }, // field filtering
  );
  if (!getFacultyByTokenUserId) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found");
  }

  const isCourseBelongToThisFaculty = await EnrolledCourseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: getFacultyByTokenUserId._id,
  });

  if (!isCourseBelongToThisFaculty) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not allowed to update the mark",
    );
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  };

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourseModel.findByIdAndUpdate(
    isCourseBelongToThisFaculty?._id,
    modifiedData,
    { new: true, runValidators: true },
  );

  return result;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
