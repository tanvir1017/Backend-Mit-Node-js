// ************* Validation with zod *******************

import { z } from "zod";

// UserName Schema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(25, "First name must be in the range of 25 letters")
    .trim(),
  // .regex(/^[A-Z]/, "First name must start with a capital letter")
  middleName: z
    .string()
    .max(15, "Middle name must be in the range of 15 letters")
    .optional(),
  lastName: z.string().max(25, "Last name must be in the range of 25 letters"),
});

// Guardian Schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  motherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  motherOccupation: z.string().trim(),
  fatherContact: z.string().trim(),
  motherContact: z.string().trim(),
});

// Local Guardian Schema
const createLocalGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim(),
});

// Student Schema
const createStudentSchemaValidation = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: "Password can't be more than 20 characters" })
      .trim()
      .optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      age: z.number().min(1, "Age must be a positive number"),
      gender: z.enum(["male", "female", "others"], {
        message: "Gender must be Male, Female, or Others",
      }),
      email: z
        .string()
        .email("Email must be a valid email address. ex: you@gmail.com")
        .trim(),
      dateOfBirth: z.string(),
      contactNo: z.string().trim(),
      emergencyContactNumber: z.string().trim(),
      presentAddress: z.string().trim(),
      permanentAddress: z.string().trim(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
        message: "Blood group must be a valid blood group",
      }),
      guardian: createGuardianValidationSchema,
      profileImage: z.string().trim().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      localGuardian: createLocalGuardianValidationSchema,
    }),
  }),
});

const updateUserNameValidationSchema = createUserNameValidationSchema.partial();

const updateGuardianValidationSchema = createGuardianValidationSchema.partial();

const updateLocalGuardianValidationSchema =
  createLocalGuardianValidationSchema.partial();

const updateStudentSchemaValidation = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema,
        age: z.number().min(1, "Age must be a positive number").optional(),
        gender: z
          .enum(["male", "female", "others"], {
            message: "Gender must be Male, Female, or Others",
          })
          .optional(),
        email: z
          .string()
          .email("Email must be a valid email address. ex: you@gmail.com")
          .trim()
          .optional(),
        dateOfBirth: z.string().optional(),
        contactNo: z.string().trim().optional(),
        emergencyContactNumber: z.string().trim().optional(),
        presentAddress: z.string().trim().optional(),
        permanentAddress: z.string().trim().optional(),
        bloodGroup: z
          .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
            message: "Blood group must be a valid blood group for humans",
          })
          .optional(),
        guardian: updateGuardianValidationSchema,
        profileImage: z.string().trim().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        localGuardian: updateLocalGuardianValidationSchema,
      })
      .partial(), // This makes every field in the student object optional
  }),
});
export const StudentValidationViaZOD = {
  createStudentSchemaValidation,
  updateStudentSchemaValidation,
};
