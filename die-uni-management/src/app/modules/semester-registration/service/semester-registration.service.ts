import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../errors/appError";
import { AcademicSemester } from "../../academic-semester/model/academicSemester.model";
import OfferCourseModel from "../../offered-course/model/offered-course.model";
import { SEMESTER_REGISTRATION_STATUS_OBJ } from "../constant/semester-registration.constant";
import { TSemesterRegistration } from "../interface/semester-registration.interface";
import { SemesterRegistrationModel } from "../model/semester-registration.model";

const getAllRegisteredSemesterFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate("academicSemester"),
    query,
  );

  const queryBuilderPropertyAttach = semesterRegistrationQuery
    .filter()
    .fieldLimiting()
    .sort()
    .paginate();

  const result = await queryBuilderPropertyAttach.modelQuery;
  return result;
};

// TODO => get single registered semester
const getSingleRegisteredSemesterFromDB = async (payload: string) => {
  //* check if id is available for find or not
  if (!payload) throw new AppError(404, "Please provide a valid id");

  const result = await SemesterRegistrationModel.findById(payload);
  return result;
};

// TODO => register a new semester
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //*  check if there any registered semester that is already "UPCOMING" | "ONGOING"
  const isThereAnyUpcomingOrOngoingSemesterExist =
    await SemesterRegistrationModel.findOne({
      $or: [
        {
          status: SEMESTER_REGISTRATION_STATUS_OBJ.UPCOMING,
        },
        {
          status: SEMESTER_REGISTRATION_STATUS_OBJ.ENDED,
        },
      ],
    });

  //*  If its true then throw new error
  if (isThereAnyUpcomingOrOngoingSemesterExist)
    throw new AppError(
      400,
      `There is already an ${isThereAnyUpcomingOrOngoingSemesterExist.status} registered semester exist!`,
    );

  //* check i the semester is exist
  const isAcademicExists = await AcademicSemester.findById(academicSemester);
  if (!isAcademicExists)
    throw new AppError(404, "this academic semester not found");

  //* check i the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(409, "This semester registration already exists");
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

// TODO => update registered semester
const updateRegisteredSemesterIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //* Is the semester registration id exist or not
  const isSemesterIdExist = await SemesterRegistrationModel.findById(id);

  if (!isSemesterIdExist)
    throw new AppError(400, "Provided semester is not found");

  //* If the payload is empty then we will throw an error
  if (!Object.keys(payload).length)
    throw new AppError(400, "Nothing for update");

  //* if the semester registration status ENDED then we will not allow to update this semester
  const currentSemesterStatus = isSemesterIdExist?.status;
  const requestedSemesterStatus = payload.status;

  //* if semester ended then throw the error
  if (currentSemesterStatus === SEMESTER_REGISTRATION_STATUS_OBJ.ENDED)
    throw new AppError(400, "This semester is ended");

  //* front-end can't directly update any semester status from UPCOMING to ENDED
  if (
    currentSemesterStatus === SEMESTER_REGISTRATION_STATUS_OBJ.UPCOMING &&
    requestedSemesterStatus === SEMESTER_REGISTRATION_STATUS_OBJ.ENDED
  ) {
    throw new AppError(
      400,
      `You can't directly update any course from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  //* front-end can't directly update any semester status from ONGOING to UPCOMING
  if (
    currentSemesterStatus === SEMESTER_REGISTRATION_STATUS_OBJ.ONGOING &&
    requestedSemesterStatus === SEMESTER_REGISTRATION_STATUS_OBJ.UPCOMING
  ) {
    throw new AppError(
      400,
      `You can't directly update any course from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }

  // TODO => After all business logic are successfully checked then update what need
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );

  return result;
};
// TODO => Delete semester registration and offered courses associated with
const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
  **/

  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists)
    throw new AppError(400, "semester registration not found");

  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== "UPCOMING") {
    throw new AppError(
      400,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  //* First we've to delete the semester registration associated  courses

  const session = await mongoose.startSession();
  try {
    //* start session first
    session.startTransaction();

    //* while its playing two database write we must use rollback and transaction
    const deletedOfferedCourse = await OfferCourseModel.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );

    if (!deletedOfferedCourse) {
      throw new AppError(400, "Failed to delete semester registration !");
    }

    const deleteSemesterRegistration =
      await SemesterRegistrationModel.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deleteSemesterRegistration) {
      throw new AppError(400, "Failed to delete semester registration !");
    }

    //* after that we've to commit the transaction
    await session.commitTransaction();

    //* then end the session transaction
    await session.endSession();

    return null;
  } catch (error) {
    //* if we get any error abortTransaction()
    await session.abortTransaction();

    //* then endSession()
    await session.endSession();

    throw new AppError(400, error);
  }

  //* Then we can delete the semester registration
};

export const SemesterRegistrationServices = {
  getAllRegisteredSemesterFromDB,
  getSingleRegisteredSemesterFromDB,
  createSemesterRegistrationIntoDB,
  updateRegisteredSemesterIntoDB,
  deleteSemesterRegistrationFromDB,
};
