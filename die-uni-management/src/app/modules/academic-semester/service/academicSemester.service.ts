import { academicSemesterNameWithCodeMapper } from "../constant/academicSemester.constant";
import { TAcademicSemester } from "../interface/academicSemester.interface";
import { AcademicSemester } from "../model/academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Checking if the orientation of semester with it's code accurate or not

  if (academicSemesterNameWithCodeMapper[payload.name] !== payload.code) {
    throw new Error(
      `${payload.name} has invalid semester code: ${payload.code}`,
    );
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// TODO => get all academic semesters Service
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find({});

  return result;
};

// TODO => get single academic semester by ID Service
const getSingleAcademicSemestersFromDB = async (payload: string) => {
  const result = await AcademicSemester.findOne({ _id: payload });
  return result;
};

// TODO => get single academic semester by ID Service
const updateSingleAcademicSemestersFromDB = async (
  id: string,
  // payload: z.infer<
  //   typeof AcademicSemesterValidationZOD.updateAcademicSemesterValidation
  // >,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameWithCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error(
      `${payload.name} has invalid semester code: ${payload.code}`,
    );
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true, // for returning modified result
  });
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemestersFromDB,
  updateSingleAcademicSemestersFromDB,
};
