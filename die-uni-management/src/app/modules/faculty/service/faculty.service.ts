import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import { User } from "../../user/model/user.model";
import { TFaculty } from "../interface/faculty.interface";
import { FacultyModel } from "../model/faculty.model";

export const FacultyServices = {
  // TODO => get all faculties
  getAllFacultyFromDB: async () => {
    const faculties = await FacultyModel.find({});
    return faculties;
  },

  // TODO => get single faculties
  getSingleFacultyFromDB: async (id: string) => {
    const faculties = FacultyModel.findById(id);
    const result = await faculties;
    //.populate("academicFaculty");
    //   .populate({
    //   path: "academicDepartment",
    //   populate: {
    //     path: "academicFaculty",
    //   },
    // });
    return result;
  },

  // Todo -> update faculty from db
  updateFacultyFromDB: async (id: string, payload: Partial<TFaculty>) => {
    // Reform Payload for update

    /* name: {
      firstName: "Tanvir",
      middleName: "",
      lastName: "Hossain",
      }

       1. disturbed non-primitives value from payload
       2. after that check if the non-primitive value available or not
       3. Only non-primitives value should be destructured by their name everything else can be hold in "...rest" variables
       4. then grave all the entries that available in non-primitives data and run a for loop then form like "name.firstName = value"

          => name.firstName
    
    */

    const { name: FacultyNameInfo, ...rest } = payload;

    const updateAbleData: Record<string, unknown> = {
      ...rest,
    };

    if (FacultyNameInfo && Object.keys(FacultyNameInfo).length) {
      for (const [key, value] of Object.entries(FacultyNameInfo)) {
        updateAbleData[`name.${key}`] = value; // Fixed: Added '?' for optional chaining
      }
    }
    console.log("🚀 ~ updateAbleData:", updateAbleData);

    const result = await FacultyModel.findByIdAndUpdate(id, updateAbleData, {
      new: true,
      runValidators: true,
    });

    return result;
  },

  // Todo => delete faculty from db
  deleteFacultyFromDB: async (id: string) => {
    if (!id) {
      throw new AppError(httpStatus.BAD_REQUEST, "faculty id require");
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const deleteFaculty = await FacultyModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
          new: true,
          session,
        },
      ).populate("user");

      if (!deleteFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST, "failed to delete faculty");
      }

      const userId = deleteFaculty.user;

      const deleteUserFirst = await User.findByIdAndUpdate(
        userId,
        { isDeleted: true },
        {
          new: true,
          session,
        },
      );

      if (!deleteUserFirst) {
        throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
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
