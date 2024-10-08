import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import * as StudentInterface from "../interface/student.interface";
import StudentModel from "../model/student.model";

// Get all students
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // `$or` operation perform an OR operation in one or more collections. or operator takes a array of expression [{<expression1>, {<expression2>, {<expressionN>}}}]
  // find({$or: [{email: {$eq: "test@example.com"}}, {name: "test"}]})
  // db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
  // [{name: {$regex: searchQuery, $options: "i" |  "m" | "x"....}}, {<expression2>}, {<expressionN>}]

  // TODO => check if the searchTerm in query object empty or not
  let searchTerm = "";

  if (query?.searchTerm) {
    // TODO => if it is not empty then re-assign query value into searchTerm
    searchTerm = query.searchTerm as string;
  }

  // TODO => an array that hold the field which will be operated by or operator for search
  const studentSearchAbleField: string[] = [
    "email",
    "name.firstName",
    "presentAddress",
  ];

  // TODO -> A partial search operation by more than one field

  const findBasedOnSearchTerm = StudentModel.find({
    $or: studentSearchAbleField.map((field: string) => ({
      // TODO -> making an string into a object key by wrapping it in square bracket [field] => {"name.firstName": ....}

      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // TODO -> Performing an exact search based on any field given by query {email: 'u@email.com} while partial and exact filter can't work together we've to remove partial filter when it comes to exact match

  // TODO -> An array that will remove partial query fields

  const excludeField = ["searchTerm"];

  // TODO -> for exclude the field we've to first make a carbon copy of query because we don't wanna to delete main query value
  const CCQuery = { ...query }; // carbon copy of main query

  excludeField.forEach((el) => delete CCQuery[el]); // deleting the partial values item

  const exactMatchingQuery = await findBasedOnSearchTerm.find(CCQuery);
  // .populate("admissionSemester")
  // .populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // }); // create student data

  return exactMatchingQuery;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
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
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
    }

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete student");
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
const updateStudentFromDB = async (
  id: string,
  studentUpdateAbleData: Partial<StudentInterface.TStudent>,
) => {
  const { name, localGuardian, guardian, ...rest } = studentUpdateAbleData;
  console.log("🚀 ~ studentUpdateAbleData:", studentUpdateAbleData);

  const modifiedData: Record<string, unknown> = {
    ...rest,
  };

  if (name && Object.keys(name).length) {
    console.log("hello");
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
  console.log("🚀 ~ modifiedData:", modifiedData);

  const result = await StudentModel.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const studentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
