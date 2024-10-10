import config from "../../../config";
import { TUser } from "../../user/interface/user.interface";
import { User } from "../../user/model/user.model";
import { TFaculty } from "../interface/faculty.interface";
import { FacultyModel } from "../model/faculty.model";

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  /**
   * First grave all the data about faculty by payload
   * create a user
   * give them a password if payload not have
   * give him a role
   * make a custom generated id push into user as faculty
   * use transaction rollback
   */

  let user: Partial<TUser> = {};
  user.role = "faculty";
  user.password = password ? password : config.DEFAULT_PASS;

  // Generating ID for faculty = F-0001
  const facultyUserId = await User.find(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  const createUser = await User.create(user);

  const result = await FacultyModel.create(payload);
};

export const FacultyServices = {
  createFacultyIntoDB,
};
