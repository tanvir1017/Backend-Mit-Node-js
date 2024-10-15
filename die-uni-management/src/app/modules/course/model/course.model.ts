import mongoose from "mongoose";
import * as CourseInterface from "../interface/course.interface";

const PreRequisiteCoursesSchema =
  new mongoose.Schema<CourseInterface.TPreRequisiteCourses>({
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  });

const CourseSchema = new mongoose.Schema<CourseInterface.TCourse>({
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
});

// TODO -> Prevent deleted course to show after soft delete

CourseSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

CourseSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// CourseSchema.pre("findOneAndUpdate", function (next) {
//   this.findOneAndUpdate({ isDeleted: { $ne: true } });
//   next();
// });

const CourseModel = mongoose.model<CourseInterface.TCourse>(
  "course",
  CourseSchema,
);

export default CourseModel;
