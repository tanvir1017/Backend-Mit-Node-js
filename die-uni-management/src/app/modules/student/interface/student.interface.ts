// import { Schema, model, connect } from "mongoose";
import { Types } from "mongoose";
import {
  T_GENDER_COMMON__TYPE,
  TBLOOD_GROUP,
} from "../../../interface/common/common.type";

// * How **

// * Guardian Type**
type TGuardian = {
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  motherContact: string;
  fatherContact: string;
};

// * Local Guardian**
type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// * Student Name
type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// * User types **
type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  age: number;
  gender: T_GENDER_COMMON__TYPE;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: TBLOOD_GROUP;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export { TGuardian, TLocalGuardian, TStudent, TUserName };
