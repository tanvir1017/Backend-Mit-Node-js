import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../errors/appError";
import { AcademicSemester } from "../../academic-semester/model/academicSemester.model";
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
  // TODO => check if id is available for find or not
  if (!payload) throw new AppError(404, "Please provide a valid id");

  const result = await SemesterRegistrationModel.findById(payload);
  return result;
};

// TODO => register a new semester
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //   TODO => check i the semester is exist
  const isAcademicExists = await AcademicSemester.findById(academicSemester);
  if (!isAcademicExists)
    throw new AppError(404, "this academic semester not found");

  //   TODO => check i the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(409, "This semester registration already exists");
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const deleteRegisteredSemesterFromDB = async () => {
  const result = await SemesterRegistrationModel.find({});

  return result;
};

const updateRegisteredSemesterIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  if (!id) throw new AppError(404, "Semester id is not valid or provided");

  if (!Object.keys(payload).length)
    throw new AppError(400, "Nothing for update");

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );

  return result;
};
export const SemesterRegistrationServices = {
  getAllRegisteredSemesterFromDB,
  getSingleRegisteredSemesterFromDB,
  createSemesterRegistrationIntoDB,
  deleteRegisteredSemesterFromDB,

  updateRegisteredSemesterIntoDB,
};
