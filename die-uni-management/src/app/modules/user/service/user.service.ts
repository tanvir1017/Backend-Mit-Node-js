import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../../config";
import AppError from "../../../errors/appError";
import { TAcademicSemester } from "../../academic-semester/interface/academicSemester.interface";
import { AcademicSemester } from "../../academic-semester/model/academicSemester.model";
import { TFaculty } from "../../faculty/interface/faculty.interface";
import { FacultyModel } from "../../faculty/model/faculty.model";
import { generateFacultyId } from "../../faculty/utils/faculty.utils";
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

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

// TODO => creating new faculty into DB

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  /**
   * First grave all the data about faculty by payload
   * create a user
   * give them a password if payload not have
   * give him a role
   * make a custom generated id push into user as faculty
   * use transaction rollback
   */
  const user: Partial<TUser> = {};
  user.role = "faculty";
  user.password = password ? password : config.DEFAULT_PASS;

  // TODO => starting session
  const session = await mongoose.startSession();
  try {
    // TODO => starting transaction session
    session.startTransaction();

    user.id = await generateFacultyId();

    // TODO => creating user with session | Transaction 01
    const newFacultyUser = await User.create([user], { session }); // will return data into a array

    if (!newFacultyUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new user");
    }

    // TODO -> embalming userId and custom id to faculty info

    payload.id = newFacultyUser[0].id; // faculty userId embedded to facultyId
    payload.user = newFacultyUser[0]._id; // faculty user _id embedded to faculty user property

    const newFaculty = await FacultyModel.create([payload], { session }); // injecting transaction session into creating faculty

    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to create new Faculty",
      );
    }

    // TODO =>  After every session done successfully or failed whatever commit the transaction
    await session.commitTransaction();

    // TODO =>  After every session done successfully or failed whatever commit the transaction
    await session.endSession();

    return newFaculty;
  } catch (error) {
    // TODO => if occur any error then end the session and abort session the transaction
    await session.abortTransaction();

    // TODO => after abort the transaction the end the session also
    await session.endSession();

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
