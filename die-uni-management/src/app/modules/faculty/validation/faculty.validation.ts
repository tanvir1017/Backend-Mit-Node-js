import { z } from "zod";

const createFacultyNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(25, "First name can't be longer than 25 characters")
    .trim(),
  middleName: z
    .string()
    .max(15, "Middle Name can't be longer than 25 characters"),
  lastName: z
    .string()
    .max(25, "Last name can't be longer than 25 characters")
    .trim(),
});

//***************** CREATE VALIDATION SCHEMA FOR FACULTY *****************************
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, "Password can't be longer than 20 characters")
      .trim(),
    faculty: z.object({
      name: createFacultyNameValidationSchema,
      email: z.string().email("Please provide a valid email address").trim(),
      gender: z.enum(["male", "female", "others"], {
        message: "Gender must be Male, Female or Others",
      }),
      dateOfBirth: z.string().trim(),
      age: z.number({
        message: "age should be a number",
      }),
      contactNo: z.string().trim(),
      emergencyContactNo: z.string().trim(),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      academicFaculty: z.string().trim(),
      academicDepartment: z.string().trim(),
      profileImage: z.string().trim().optional(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
        message: "Blood group must be a valid blood group ",
      }),
      isDeleted: z.boolean(),
      designation: z.string().trim(),
    }),
  }),
});

//***************** UPDATE VALIDATION SCHEMA FOR FACULTY *****************************
const updateFacultyValidationSchema = createFacultyValidationSchema.partial();

export const FacultyValidationViaZod = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
