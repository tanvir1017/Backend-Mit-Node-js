import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import env from "../../../config";
import AppError from "../../../errors/appError";
import { TAcademicSemester } from "../../academic-semester/interface/academicSemester.interface";
import { AcademicSemester } from "../../academic-semester/model/academicSemester.model";
import * as AdminInterface from "../../admin/interface/admin.interface";
import { Admin } from "../../admin/model/admin.model";
import * as FacultyInterface from "../../faculty/interface/faculty.interface";
import { FacultyModel } from "../../faculty/model/faculty.model";
import { generateFacultyId } from "../../faculty/utils/faculty.utils";
import * as StudentInterface from "../../student/interface/student.interface";
import StudentModel from "../../student/model/student.model";
import { TUser } from "../interface/user.interface";
import { User } from "../model/user.model";
import constructUrlAndImageUploaderUtil from "../utils/constructCloudinaryUrlAndUploadImage";
import { generateAdminId, generatedID } from "../utils/generateID";

// TODO => Creating a new student to DB
const createStudentIntoDB = async (
  file: Express.Multer.File,
  payload: StudentInterface.TStudent,
) => {
  //const modeInstance = new StudentModel(student);
  //const result = await modeInstance.save(); // save student data

  // creating user object
  const userData: Partial<TUser> = {};

  userData.password = env.DEFAULT_PASS as string;
  //setting student role
  userData.role = "student";
  //setting student email to user
  userData.email = payload.email;

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

    // uploading img into cloudinary
    const imageUploader = await constructUrlAndImageUploaderUtil(
      payload,
      file,
      userData,
    );

    // set id and user = _id to student object
    payload.id = newUser[0].id; // embedded id
    payload.user = newUser[0]._id; // ref _Id
    payload.profileImage = imageUploader.secure_url;

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
const createFacultyIntoDB = async (
  file: Express.Multer.File,
  payload: FacultyInterface.TFaculty,
) => {
  /**
   * First grave all the data about faculty by payload
   * create a user
   * give them a password if payload not have
   * give him a role
   * make a custom generated id push into user as faculty
   * use transaction rollback
   */
  const userData: Partial<TUser> = {};
  userData.password = env.DEFAULT_PASS;
  //setting faculty email to user
  userData.email = payload.email;
  //setting faculty role
  userData.role = "faculty";

  // TODO => starting session
  const session = await mongoose.startSession();
  try {
    // TODO => starting transaction session
    session.startTransaction();

    userData.id = await generateFacultyId();

    // uploading img into cloudinary
    const imageUploader = await constructUrlAndImageUploaderUtil(
      payload,
      file,
      userData,
    );

    // TODO => creating user with session | Transaction 01
    const newFacultyUser = await User.create([userData], { session }); // will return data into a array

    if (!newFacultyUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create new user");
    }

    // TODO -> embalming userId and custom id to faculty info

    payload.id = newFacultyUser[0].id; // faculty userId embedded to facultyId
    payload.user = newFacultyUser[0]._id; // faculty user _id embedded to faculty user property
    payload.profileImage = imageUploader?.secure_url; // injecting uploaded img file

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

// TODO =>  create Admin into db along side by creating a user
const createAdminIntoDB = async (
  file: Express.Multer.File,
  payload: AdminInterface.TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = env.DEFAULT_PASS as string;

  //set student role
  userData.role = "admin";
  //setting student email to user
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
    console.log(newUser);

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    // uploading img into cloudinary
    const imageUploader = await constructUrlAndImageUploaderUtil(
      payload,
      file,
      userData,
    );

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = imageUploader?.secure_url; // injecting uploaded file

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// TODO =>  get individual information by them self
const getMeFromDB = async (payload: JwtPayload) => {
  let result = null;
  if (payload.role === "student") {
    result = await StudentModel.findOne({ id: payload.userId }).populate(
      "user",
    );
  } else if (payload.role === "admin") {
    result = await Admin.findOne({ id: payload.userId }).populate("user");
  } else {
    result = await FacultyModel.findOne({ id: payload.userId }).populate(
      "user",
    );
  }
  return result;
};

// TODO => change user status from admin only
const changeStatusOfAnUserFromDB = async (
  id: string,
  payload: Pick<TUser, "status">,
) => {
  if (!id) {
    throw new AppError(httpStatus.BAD_REQUEST, "Id must be provided");
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatusOfAnUserFromDB,
};
