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

const updateFacultyNameValidationSchema =
  createFacultyNameValidationSchema.partial();
const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z
      .object({
        name: updateFacultyNameValidationSchema,
        email: z
          .string()
          .email("Please provide a valid email address")
          .trim()
          .optional(),
        gender: z
          .enum(["male", "female", "others"], {
            message: "Gender must be Male, Female or Others",
          })
          .optional(),
        dateOfBirth: z.string().trim().optional(),
        age: z
          .number({
            message: "age should be a number",
          })
          .optional(),
        contactNo: z.string().trim().optional(),
        emergencyContactNo: z.string().trim().optional(),
        presentAddress: z.string().trim().optional(),
        permanentAddress: z.string().trim().optional(),
        academicFaculty: z.string().trim().optional(),
        academicDepartment: z.string().trim().optional(),
        profileImage: z.string().trim().optional().optional(),
        bloodGroup: z
          .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
            message: "Blood group must be a valid blood group ",
          })
          .optional(),
        isDeleted: z.boolean().optional(),
        designation: z.string().trim().optional(),
      })
      .partial(),
  }),
});

export const FacultyValidationViaZod = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
