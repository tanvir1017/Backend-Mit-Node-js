// ************* Validation with zod *******************

import { z } from "zod";

// UserName Schema
const UserNameSchema = z.object({
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
  // .regex(
  //   /^[A-Za-z]+$/,
  //   "Last name must not contain numbers or special characters",
  // ),
});

// Guardian Schema
const GuardianSchema = z.object({
  fatherName: z.string().trim(),
  motherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  motherOccupation: z.string().trim(),
  fatherContact: z.string().trim(),
  motherContact: z.string().trim(),
});

// Local Guardian Schema
const LocalGuardianSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z.string().trim(),
  address: z.string().trim(),
});

// Student Schema
const StudentValidationSchemaZOD = z.object({
  id: z.string().trim(),
  name: UserNameSchema,
  password: z
    .string()
    .max(20, { message: "Password can't be more than 20 characters" })
    .trim(),
  age: z.number().min(1, "Age must be a positive number"),
  gender: z.enum(["male", "female", "others"], {
    message: "Gender must be Male, Female, or Others",
  }),
  email: z
    .string()
    .email("Email must be a valid email address. ex: you@gmail.com")
    .trim(),
  dateOfBirth: z.string().trim().optional(),
  contactNo: z.string().trim(),
  emergencyContactNumber: z.string().trim(),
  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    message: "Blood group must be a valid blood group for humans",
  }),
  guardian: GuardianSchema,
  isActive: z.enum(["active", "inactive"]).default("active"),
  isDeleted: z.boolean().default(false),
  profileImage: z.string().trim().optional(),
  localGuardian: LocalGuardianSchema,
});

/**
 
    const studentValidationSchemaZOD = zod.object({
      id: zod.string(),
      name: zod.object({
        firstName: zod
          .string()
          .max(25, {
            message: "First Name is required and should it be in 25 characters",
          })
          .trim(),

        middleName: zod
          .string()
          .max(15, {
            message: "Last Name is required and should it be in 15 characters",
          })
          .trim()
          .optional(),
        lastName: zod
          .string()
          .max(25, {
            message: "First Name is required and should it be in 25 characters",
          })
          .trim(),
      }),
      age: zod.number(),
      gender: zod.enum(["male", "female", "others"]),
      dateOfBirth: zod.string().trim().optional(),
      email: zod.string().email({ message: "Invalid Email address" }).trim(),
      contactNo: zod
        .string()
        .max(11, { message: "Contact number should 11 number(+880 - BDT) " }),
      emergencyContactNumber: zod
        .string()
        .max(11, { message: "Contact number should 11 number(+880 - BDT) " }),
      presentAddress: zod.string(),
      permanentAddress: zod.string(),
      bloodGroup: zod.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        message: "Blood group should be from given blood group",
      }),
      guardian: zod.object({
        fatherName: zod.string().trim(),
        fatherOccupation: zod.string().trim(),
        motherName: zod.string().trim(),
        motherOccupation: zod.string().trim(),
        motherContact: zod.string().trim(),
        fatherContact: zod.string().trim(),
      }),
      localGuardian: zod.object({
        name: zod.string().trim(),
        occupation: zod.string().trim(),
        contactNo: zod.string().trim(),
        address: zod.string().trim(),
      }),
      profileImage: zod.string().trim().optional(),
      isActive: zod.enum(["active", "inactive"]).optional(),
    });
 */

export default StudentValidationSchemaZOD;
