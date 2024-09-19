// import { Schema, model, connect } from "mongoose";

// * How **

// * Guardian Type**
type Guardian = {
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  motherContact: string;
  fatherContact: string;
};

// * Local Guardian**
type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// * Student Name
type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// * User types **
type Student = {
  id: string;
  name: UserName;
  age: number;
  gender: "male" | "female" | "others";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive?: "active" | "inactive";
};

export { Guardian, LocalGuardian, Student, UserName };
