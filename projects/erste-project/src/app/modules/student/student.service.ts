import * as StudentInterface from "./student.interface";
import StudentModel from "./student.schema";

// Creating a new student to DB
const createStudentIntoDB = async (student: StudentInterface.Student) => {
  //const result = await StudentModel.create(student); // create student data
  const modeInstance = new StudentModel(student);
  const result = await modeInstance.save(); // save student data
  return result;
};

// Get all students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find(); // create student data
  return result;
};

// get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
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
const updateStudentFromDB = async <T extends StudentInterface.Student>(
  id: string,
  fieldAndValue: T,
) => {
  const result = await StudentModel.updateOne(
    { id },
    { $set: { ...fieldAndValue } },
  );
};

export const studentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
