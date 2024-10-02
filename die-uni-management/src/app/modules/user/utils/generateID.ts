import { TAcademicSemester } from "../../academic-semester/interface/academicSemester.interface";
import { TUser } from "../interface/user.interface";
import { User } from "../model/user.model";

// generated ID will be placed

const findLastStudentId = async () => {
  // TODO => FINDING THE LAST STUDENT ID VIA SORTING AND USED QUICK FASTER QUERY lean() method
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

  return lastStudentId?.id ? lastStudentId?.id : undefined;
};

// TODO =>  year semester code 4 digits number => 2024020001
export const generatedID = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // '0000'

  const latestStudentId = (await findLastStudentId()) as string;

  // 2030 01 0001

  const lastStudentSemesterCode = latestStudentId?.substring(4, 6); // 01 Semester code
  const lastStudentYear = latestStudentId?.substring(0, 4); // 2030 year
  const currentSemesterCode = payload.code; // 01 payload
  const currentSemesterYear = payload.year; // 20230 payload

  /**
   *** @param {generateID} ->  How to generate ID will work. Let's break it down
   * First, if the student in same year and same semester then it will increment 1 from previous id => 2030 01 0001 + 2030 01 0002
   * if the student in same year but not the semester code then it will again counting from 01 => 2030 02 0001 + 2030 02 0002
   * Second, if the student in not same year then it will counting from 01 also the semester code should be different => 2031 01 0001
   */

  if (
    latestStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentSemesterYear
  ) {
    currentId = latestStudentId.substring(6); // "0005" => "0006"
  }

  let idAfterIncrement = (Number(currentId) + 1).toString().padStart(4, "0"); // 0001

  idAfterIncrement = `${payload.year}${payload.code}${idAfterIncrement}`;

  // console.log("🚀 ~ generatedID ~ idAfterIncrement:", idAfterIncrement); // 👉 203002 ⭕ 0001 => ❌ 2030 03 0004
  return idAfterIncrement;
};
