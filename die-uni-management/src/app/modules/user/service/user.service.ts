import config from "../../../config";
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

  userData.id = await generatedID(academicSemesterDetails);

  //create a user
  const newUser = await User.create(userData); // create student data

  if (Object.keys(newUser).length) {
    // set id and user = _id to student object
    payload.id = newUser.id; // embedded id
    payload.user = newUser._id; // ref _Id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
