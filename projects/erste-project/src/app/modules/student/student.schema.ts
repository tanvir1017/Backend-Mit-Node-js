import mongoose from "mongoose";
import * as StudentInterface from "./student.interface";

import validator from "validator";

const UserNameSchema = new mongoose.Schema<StudentInterface.UserName>({
  firstName: {
    type: String,
    required: [true, "First name must be provided"],
    maxlength: [25, "First name must be in the range of 25 letters"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const capitalizeFirstWord =
          value.charAt(0).toUpperCase() + value.slice(1);
        return value === capitalizeFirstWord;
      },
      message:
        "{VALUE} is not valid formate for first name, It should be in capitalize",
    },
  },
  middleName: {
    type: String,
    required: [true, "Middle name must be provided"],
    maxlength: [15, "First name must be in the range of 15 letters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name must be provided"],
    maxlength: [25, "First name must be in the range of 25 letters"],
    trim: true,
    // * validating last name
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message:
        "You are adding number to your last name: {VALUE}, which is not valid. Remove number from last name, and try again!",
    },
  },
});

const GuardianSchema = new mongoose.Schema<StudentInterface.Guardian>({
  fatherName: {
    type: String,
    required: [true, "First(Guardian ) name is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother(Guardian ) name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father(Guardian ) Occupation is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother(Guardian ) Occupation is required"],
    trim: true,
  },
  fatherContact: {
    type: String,
    required: [true, "Father(Guardian ) Contact is required"],
    trim: true,
  },
  motherContact: {
    type: String,
    required: [true, "Mother(Guardian ) contact is required"],
    trim: true,
  },
});

const LocalGuardianSchema = new mongoose.Schema<StudentInterface.LocalGuardian>(
  {
    name: {
      type: String,
      required: [true, "Local Guardian name is required"],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, "Local Guardian occupation is required"],
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Local Guardian contact no is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Local Guardian address is required"],
      trim: true,
    },
  },
);

const StudentSchema = new mongoose.Schema<StudentInterface.Student>({
  id: {
    type: String,
    required: [true, "Id must be provided"],
    unique: true,
    trim: true,
  },
  name: {
    type: UserNameSchema,
    required: [true, "Name property missing please re-check "],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Age must be provided"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not a valid gender",
    },
    required: [
      true,
      "Gender must be provided and it should be Male, Female or Others",
    ],
  },
  email: {
    type: String,
    unique: true,
    required: [
      true,
      "Email must be provided and it should be a valid email address",
    ],
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a valid email address",
    },
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "ContactNo must be provided"],
    trim: true,
  },
  emergencyContactNumber: {
    type: String,
    required: [true, "Emergency Contact Number must be provided"],
    trim: true,
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address must be provided"],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address Mut Be Provided"],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      message: "{VALUE} is not a valid blood group for human",
    },
    required: [true, "Blood Group must be a valid blood group for human"],
  },
  guardian: {
    type: GuardianSchema,
    required: [true, "Guardian information must be provided"],
  },
  isActive: {
    type: String,
    enum: {
      values: ["active", "inactive"],
      message: "{VALUE} is not a valid status",
    },
    required: [true, "Active status must be provided"],
  },
  profileImage: {
    type: String,
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: [true, "LocalGuardian information must be provided"],
  },
});

// ** Creating model for schema
const StudentModel = mongoose.model<StudentInterface.Student>(
  "Student",
  StudentSchema,
);

export default StudentModel;
