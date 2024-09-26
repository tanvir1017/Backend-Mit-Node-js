import config from "../../config";
import * as StudentInterface from "../student/student.interface";
import StudentModel from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// TODO => Creating a new student to DB
const createStudentIntoDB = async (
  password: string,
  studentData: StudentInterface.TStudent,
) => {
  //const modeInstance = new StudentModel(student);
  //const result = await modeInstance.save(); // save student data

  // creating user object
  const userData: Partial<TUser> = {};

  userData.password = password || (config.DEFAULT_PASS as string);
  //setting student role
  userData.role = "student";

  //set manually generated id
  userData.id = "2030100002";

  //create a user
  const newUser = await User.create(userData); // create student data

  if (Object.keys(newUser).length) {
    // set id and user = _id to student object
    studentData.id = newUser.id; // embedded id
    studentData.user = newUser._id; // ref _Id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
