import mongoose from "mongoose";
import * as FacultyInterface from "../interface/faculty.interface";

const FacultyName = new mongoose.Schema<FacultyInterface.TFacultyName>({
  firstName: {
    type: String,
    required: [true, "First name required"],
    maxlength: [25, "First name can't be longer than 25 characters"],
    trim: true,
  },
  middleName: {
    type: String,
    maxlength: [15, "Middle name can't be longer than 25 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name required"],
    maxlength: [25, "Last name can't be longer than 25 characters"],
    trim: true,
  },
});

const FacultySchema = new mongoose.Schema<FacultyInterface.TFaculty>(
  {
    id: {
      type: String,
      required: [true, "Faculty id is required F-XXXXX"],
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User must be provided"],
      unique: true,
      ref: "User",
    },
    name: {
      type: FacultyName,
      required: [true, "Names property missing, Re-check"],
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth must be provided"],
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
      trim: true,
    },
    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    profileImage: {
      type: String,
    },
    bloodGroup: {
      type: String,
      require: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

FacultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

FacultySchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

FacultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

FacultySchema.pre("findOneAndUpdate", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

export const FacultyModel = mongoose.model<FacultyInterface.TFaculty>(
  "faculty",
  FacultySchema,
);
