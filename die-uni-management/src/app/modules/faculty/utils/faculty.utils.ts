import { User } from "../../user/model/user.model";

const findLastFaculty = async () => {
  const facultyUserID = await User.findOne(
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

  return facultyUserID?.id ? facultyUserID?.id : undefined;
};

export const generateFacultyId = async () => {
  let currFacultyId = (0).toString(); // '0'
  const lastFaculty = await findLastFaculty();
  if (lastFaculty) {
    currFacultyId = lastFaculty.substring(2);
  }
  currFacultyId = (Number(currFacultyId) + 1).toString().padStart(4, "0"); // 0001
  return `F-${currFacultyId}`;
};
