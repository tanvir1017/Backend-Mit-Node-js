import { Request, Response } from "express";
import { studentService } from "./student.service";

// TODO =>  Student creation controller
const createStudentController = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = await req.body;

    // will call service function to send this data
    const result = await studentService.createStudentIntoDB(studentData);

    // Send response
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
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
  } catch (error) {
    console.log(error);
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

    res.status(404).send({
      success: false,
      message: "Id not found from client",
      data: {},
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudentController,
  getAllStudent,
  getSingleStudentById,
};
