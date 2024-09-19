import mongoose from "mongoose";
import * as StudentInterface from "./student.interface";

const UserNameSchema = new mongoose.Schema<StudentInterface.UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const GuardianSchema = new mongoose.Schema<StudentInterface.Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  fatherContact: {
    type: String,
    required: true,
  },
  motherContact: {
    type: String,
    required: true,
  },
});

const LocalGuardianSchema = new mongoose.Schema<StudentInterface.LocalGuardian>(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
);

const StudentSchema = new mongoose.Schema<StudentInterface.Student>({
  id: {
    type: String,
    required: true,
  },
  name: UserNameSchema,
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNumber: { type: String, required: true },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    required: true,
  },
  guardian: GuardianSchema,
  isActive: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  profileImage: {
    type: String,
  },
  localGuardian: LocalGuardianSchema,
});

// ** Creating model for schema
const StudentModel = mongoose.model<StudentInterface.Student>(
  "Student",
  StudentSchema,
);

export default StudentModel;
