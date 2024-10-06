import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import * as StudentInterface from "../interface/student.interface";
import StudentModel from "../model/student.model";

// Get all students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find({}); // create student data
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
  }
};

/**
 * Updating student information from db
 * @param {string} id
 * @param {object} fieldAndValue The object from req.body
 */
const updateStudentFromDB = async <T extends StudentInterface.TStudent>(
  id: string,
  fieldAndValue: T,
) => {
  const result = await StudentModel.updateOne(
    { id },
    { $set: { ...fieldAndValue } },
  );
};

export const studentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
