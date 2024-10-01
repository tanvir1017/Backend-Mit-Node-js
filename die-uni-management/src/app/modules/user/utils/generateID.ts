import { TAcademicSemester } from "../../academic-semester/interface/academicSemester.interface";
import { TUser } from "../interface/user.interface";
import { User } from "../model/user.model";

// generated ID will be placed

const findLastStudentId = async () => {
  const lastStudentId = (await User.findOne(
    {
      role: "student",
    },
    {
      id: true,
      _id: false,
    },
  )
    .sort({ createdAt: -1 })
    .lean()) as Partial<TUser>;

  return lastStudentId?.id ? lastStudentId.id.substring(6) : undefined;
};

// TODO =>  year semester code 4 digits number => 2024020001
export const generatedID = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudentId()) || (0).toString(); // '0000'
  let idAfterIncrement = (Number(currentId) + 1).toString().padStart(4, "0"); // 0001
  idAfterIncrement = `${payload.year}${payload.code}${idAfterIncrement}`;
  return idAfterIncrement;
};
