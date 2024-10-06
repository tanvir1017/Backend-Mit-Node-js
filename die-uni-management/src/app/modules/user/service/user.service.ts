import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../../config";
import AppError from "../../../errors/appError";
import { TAcademicSemester } from "../../academic-semester/interface/academicSemester.interface";
import { AcademicSemester } from "../../academic-semester/model/academicSemester.model";
import * as StudentInterface from "../../student/interface/student.interface";
import StudentModel from "../../student/model/student.model";
import { TUser } from "../interface/user.interface";
import { User } from "../model/user.model";
import { generatedID } from "../utils/generateID";

// TODO => Creating a new student to DB
const createStudentIntoDB = async (
  password: string,
  payload: StudentInterface.TStudent,
) => {
  //const modeInstance = new StudentModel(student);
  //const result = await modeInstance.save(); // save student data

  // creating user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.DEFAULT_PASS as string);
  //setting student role
  userData.role = "student";

  // TODO => getting the semester data first
  const academicSemesterDetails = (await AcademicSemester.findById(
    payload.admissionSemester,
  )) as TAcademicSemester;

  // Transactions and Rollback

  // TODO =>  Make isolated environments by creating new sessions

  const session = await mongoose.startSession();

  // make everything inside try catch for taking care of errors or falling transactions
  try {
    // TODO => start transaction session
    session.startTransaction();

    userData.id = await generatedID(academicSemesterDetails);

    // TODO => creating user with session | Transaction 02
    const newUser = await User.create([userData], { session }); // create student data

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // set id and user = _id to student object
    payload.id = newUser[0].id; // embedded id
    payload.user = newUser[0]._id; // ref _Id

    // TODO => creating student with session Transaction 01
    const newStudent = await StudentModel.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // TODO => commit transaction
    await session.commitTransaction();

    // TODO => end this session
    await session.endSession();

    return newStudent;
  } catch (error) {
    // TODO => If session environment get any error then abort the transaction process
    await session.abortTransaction();

    // TODO => after aborting end the session

    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
