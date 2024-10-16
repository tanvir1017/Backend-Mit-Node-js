import { Schema } from "mongoose";

export type TPreRequisiteCourses = {
  course: Schema.Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
};

export type TCourseFaculty = {
  course: Schema.Types.ObjectId;
  faculties: [Schema.Types.ObjectId];
};
