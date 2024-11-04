import mongoose from "mongoose";
import * as CourseInterface from "../interface/course.interface";

const PreRequisiteCoursesSchema =
  new mongoose.Schema<CourseInterface.TPreRequisiteCourses>(
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },

      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      _id: false,
    },
  );

const CourseSchema = new mongoose.Schema<CourseInterface.TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    preRequisiteCourses: [PreRequisiteCoursesSchema],
  },
  {
    timestamps: true,
  },
);

// TODO -> Prevent deleted course to show after soft delete
CourseSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CourseSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

export const CourseModel = mongoose.model<CourseInterface.TCourse>(
  "course",
  CourseSchema,
);

const CourseFacultySchema = new mongoose.Schema<CourseInterface.TCourseFaculty>(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: "course",
    },
    faculties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "faculty",
      },
    ],
  },
);

export const CourseFacultyModel =
  mongoose.model<CourseInterface.TCourseFaculty>(
    "CourseFaculty",
    CourseFacultySchema,
  );
