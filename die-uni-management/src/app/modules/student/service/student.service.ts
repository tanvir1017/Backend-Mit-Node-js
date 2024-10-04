import * as StudentInterface from "../interface/student.interface";
import StudentModel from "../model/student.model";

// Get all students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find({}); // create student data
  return result;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate("user")
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  /*const result = await StudentModel.aggregate([
    //{ $match: { isDeleted: { $ne: true } } },
    { $match: { id: id } },
  ]); */
  return result;
};

// TODO: delete student from db
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

/**
 * Updating student information from db
 * @param {string} id
 * @param {object} fieldAndValue The object from req.body
 */
const updateStudentFromDB = async <T extends StudentInterface.TStudent>(
  id: string,
  fieldAndValue: T,
) => {
  const result = await StudentModel.updateOne(
    { id },
    { $set: { ...fieldAndValue } },
  );
};

export const studentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
