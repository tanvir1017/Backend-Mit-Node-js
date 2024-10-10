import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { FacultyModel } from "../model/faculty.model";

export const FacultyServices = {
  // TODO => get all faculties
  getAllFacultyFromDB: async () => {
    const faculties = await FacultyModel.find({});
    return faculties;
  },

  // TODO => get single faculties
  getSingleFacultyFromDB: async (payload: string) => {
    const faculties = FacultyModel.findOne({ id: payload });
    const result = await faculties.populate("academicFaculty").populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
    return result;
  },

  // Todo => delete faculty from db
  deleteFacultyFromDB: async (payload: string) => {
    if (!payload) {
      throw new AppError(httpStatus.BAD_REQUEST, "faculty id require");
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const deleteUserFirst = await User.findOneAndUpdate(
        { id: payload },
        { isDeleted: true },
        {
          new: true,
          session,
        },
      );

      if (!deleteUserFirst) {
        throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
      }

      const deleteFaculty = await FacultyModel.findOneAndUpdate(
        { id: payload },
        { isDeleted: true },
        {
          new: true,
          session,
        },
      ).populate("user");

      if (!deleteFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST, "failed to delete faculty");
      }
      await session.commitTransaction();

      await session.endSession();

      return deleteFaculty;
    } catch (error) {
      await session.abortTransaction();

      await session.endSession();

      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
  },
};
