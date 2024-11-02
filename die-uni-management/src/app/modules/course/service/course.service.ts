import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../errors/appError";
import { courseSearchAbleFields } from "../constant/course.constant";
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from "../interface/course.interface";
import { CourseFacultyModel, CourseModel } from "../model/course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  // TODO: Implement function to create a course into database
  const result = await CourseModel.create(payload);

  return result;
  // Return the created course object
};

// TODO => Get all courses from the database
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  // TODO: Implement function that retrieve all the courses from the database
  const courseQuery = new QueryBuilder(
    CourseModel.find({}).populate("preRequisiteCourses.course"),
    query,
  )
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .fieldLimiting();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
};

// TODO => Get single course from the database
const getSingleCoursesFromDB = async (id: string) => {
  // TODO: Implement function that retrieve single course from DB by mongoose ID
  const result = await CourseModel.findById(id).populate(
    "preRequisiteCourses.course",
  );

  return result;
};

// TODO => Delete specific course from the database
const deleteCourseFromDB = async (id: string) => {
  // TODO: Implement function that will delete a single course from
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  return result;
};

// Todo => Update course dynamically
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...rest } = payload;
  const modifiedData: Record<string, unknown> = { ...rest };

  const session = await mongoose.startSession();

  try {
    // TODO -> First start the session without I/O
    session.startTransaction();

    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      modifiedData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update basic course info",
      );
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // TODO:Step 02 => find out what should be out what should be in COURSE
      const deletedPreRequisite = preRequisiteCourses
        .filter((el: TPreRequisiteCourses) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        {
          session,
          new: true,
          runValidators: true,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Failed to delete pre-requisites courses",
        );
      }
      const newPreRequisiteCourses = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted, // el.isDeleted === false
      );

      const updateNewPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisiteCourses },
          },
        },
        {
          session,
          new: true,
          runValidators: true,
        },
      );

      // TODO -> If server failed to add pre-requisite courses
      if (!updateNewPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Failed to add pre-requisites courses",
        );
      }
    }

    // TODO -> After all the operations are done we've to commit the transaction and end the session
    await session.commitTransaction();
    await session.endSession();

    // TODO -> After commitTransaction and after end the session then we'll finally return the final result
    const result = await CourseModel.findById(id).populate(
      "preRequisiteCourses.course",
    );

    return result;
  } catch (error: any) {
    // TODO => for catch block we've to first abort the transaction
    await session.abortTransaction();

    // TODO => Then we've to end the session
    await session.endSession();

    // TODO -> After all we've to throw a new error
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
  // TODO:Step 01 => Basic course info update
};

// TODO -> Assign faculties into course
const assignFacultiesToCourse = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  if (!courseId) {
    throw new AppError(httpStatus.NOT_FOUND, "Course id missing");
  }

  if (!Array.isArray(payload) || payload.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Faculties are required");
  }

  const result = await CourseFacultyModel.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: { faculties: { $each: payload } }, // prevent from duplicate value and will add each one into array
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// TODO -> Assign faculties into course
const removeFacultiesToCourse = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  if (!courseId) {
    throw new AppError(httpStatus.NOT_FOUND, "Course id missing");
  }

  if (!Array.isArray(payload) || payload.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Faculties are required");
  }

  const result = await CourseFacultyModel.findByIdAndUpdate(
    courseId,
    {
      $pull: { faculties: { $in: payload } }, // prevent from duplicate value and will add each one into array
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getAllFacultiesFromDB = async () => {
  const result = await CourseFacultyModel.find().populate("course");
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getSingleCoursesFromDB,
  getAllCoursesFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesToCourse,
  removeFacultiesToCourse,
  getAllFacultiesFromDB,
};
