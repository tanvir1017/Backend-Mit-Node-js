import { TAcademicFaculty } from "../interface/academic-faculty.interface";
import { AcademicFaculty } from "../model/academic-faculty.model";

// TODO: Implement function to create academic faculty into database
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// TODO: Implement function to get all academic faculties from database
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};

// TODO: Implement function to get single academic faculty by ID from databas
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// TODO: Implement function to update academic faculty by ID from database

const updateSingleAcademicFacultyFromDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyFromDB,
};
