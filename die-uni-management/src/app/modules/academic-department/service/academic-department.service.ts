import { TAcademicDepartment } from "../interface/academic-department.interface";
import { AcademicDepartment } from "../model/academic-department.model";

// TODO: Implement function to create academic department into database
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// TODO: Implement function to find all academic departments from database
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find({});
  return result;
};

// TODO: Implement function to find single academic departments from database
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate("academicFaculty");
  return result;
};

// TODO: Implement function to update academic department from database
const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
};
