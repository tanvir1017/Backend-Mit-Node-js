import { Types } from "mongoose";
import { T_GENDER_COMMON__TYPE } from "../../../interface/common/common.type";

// ** Faculty name type
export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TFacultyName;
  email: string;
  gender: T_GENDER_COMMON__TYPE;
  dateOfBirth: string;
  age: number;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImage?: string;
  bloodGroup: string;
  isDeleted: boolean;
  designation: string;
};
