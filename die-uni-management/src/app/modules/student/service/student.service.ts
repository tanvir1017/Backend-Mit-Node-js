import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { studentSearchAbleField } from "../constant/student.constant";
import * as StudentInterface from "../interface/student.interface";
import StudentModel from "../model/student.model";

// TODO -> Get all students
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(studentSearchAbleField)
    .filter()
    .sort()
    .paginate()
    .fieldLimiting();

  const result = await studentQuery.modelQuery;

  return result;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate("user")
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  /*const result = await StudentModel.aggregate([
    //{ $match: { isDeleted: { $ne: true } } },
    { $match: { id: id } },
  ]); */
  return result;
};

// TODO: delete student from db
const deleteStudentFromDB = async (id: string) => {
  // while we'll use write operation in two collection at a time we'll use Transaction Rollback

  //TODO =>  start session a session
  const session = await mongoose.startSession();

  // TODO => wrap rest of the functionality inside the try catch block
  try {
    // TODO => Now start the session transaction
    session.startTransaction();

    const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete student");
    }

    // TODO => After that Delete user

    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
    }

    // TODO =>  commit transaction
    await session.commitTransaction();

    // TODO =>  end transaction
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    // TODO => abort transaction if get any error
    await session.abortTransaction();

    // TODO => end transaction
    await session.endSession();

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to delete student",
    );
  }
};

/**
 * Updating student information from db
 * @param {string} id
 * @param {object} studentUpdateAbleData The object from req.body
 */
// TODO => Update student information from db
const updateStudentFromDB = async (
  id: string,
  studentUpdateAbleData: Partial<StudentInterface.TStudent>,
) => {
  const { name, localGuardian, guardian, ...rest } = studentUpdateAbleData;

  const modifiedData: Record<string, unknown> = {
    ...rest,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
/**
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // `$or` operation perform an OR operation in one or more collections. or operator takes a array of expression [{<expression1>, {<expression2>, {<expressionN>}}}]
  // find({$or: [{email: {$eq: "test@example.com"}}, {name: "test"}]})
  // db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
  // [{name: {$regex: searchQuery, $options: "i" |  "m" | "x"....}}, {<expression2>}, {<expressionN>}]
  // TODO -> for exclude the field we've to first make a carbon copy of query because we don't wanna to delete main query value

  const CCQuery = { ...query }; // carbon copy of main query

  // TODO => check if the searchTerm in query object empty or not

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  // TODO -> A partial search operation by more than one field

  const findBasedOnSearchTerm = StudentModel.find({
    $or: studentSearchAbleField.map((field: string) => ({
      // TODO -> making an string into a object key by wrapping it in square bracket [field] => {"name.firstName": ....}

      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // TODO -> Performing an exact search based on any field given by query {email: 'u@email.com} while partial and exact filter can't work together we've to remove partial filter when it comes to exact match

  // TODO -> An array that will remove partial query fields

  const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];

  excludeField.forEach((el) => delete CCQuery[el]); // deleting the partial values item

  const exactMatchingQuery = findBasedOnSearchTerm.find(CCQuery);
  // .populate("user")
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // }); // create student data;;

  // TODO -> Sorting documents based on last created data.
  let sort = "-createdAt";

  if (query?.sort) {
    sort = query.sort as string;
  }

  const sortQuery = exactMatchingQuery.sort(sort);

  // TODO -> Limiting docs

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query?.limit) {
    limit = Number(query.limit);
  }

  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit; // ! Formula of pagination => (page - 1) * limitNum(X)
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitingDocs = paginateQuery.limit(limit);

  // TODO -> field limiting

  let fields = "-__v";
  if (query?.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldQuery = await limitingDocs.select(fields); // fields="name email guardian"

  return fieldQuery;
};
 */
export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
