import { Request, Response } from "express";
import { studentService } from "./student.service";
import StudentValidationSchemaZOD from "./student.validation";

// TODO =>  Student creation controller
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = await req.body;

    // creating schema validation using zod
    const bodyDataValidationParser =
      StudentValidationSchemaZOD.parse(studentData);

    const result = await studentService.createStudentIntoDB(
      bodyDataValidationParser,
    );

    // Send response
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong!!",
      error: error.message,
    });
  }
};

// TODO =>  Student fetch controller From DB
const getAllStudent = async (__req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "All students fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong!!",
      error: error.message,
    });
  }
};

// TODO =>  Get single student

const getSingleStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await studentService.getSingleStudentFromDB(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Student fetched successfully",
    data: result,
  });
  try {
    const { id } = req.body.params;
    if (id) {
      const result = await studentService.getSingleStudentFromDB(id);
      if (!result) {
        res.status(404).send({
          success: false,
          message: "Student not found by this id",
          data: {},
        });
      }

      res.status(200).json({
        success: true,
        message: `Student found by this specific id: ${id}`,
        data: result,
      });
    }

    res.status(404).json({
      success: false,
      message: "Id not found from client",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong!!",
      error: error.message,
    });
  }
};

// TODO =>  Delete single student
const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    // TODO => checking id params
    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student id is required",
      });
    }

    const result = await studentService.deleteStudentFromDB(studentId);

    // TODO => checking the result if id is available or not
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudentById,
  deleteStudentById,
};
