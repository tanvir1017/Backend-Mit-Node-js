import { z } from "zod";

const userSchemaValidationZOD = z.object({
  password: z
    .string({
      invalid_type_error: "password must be string",
    })
    .max(20, { message: "Password cannot be more than 20 characters" })
    .optional(),
});

export const UserValidation = { userSchemaValidationZOD };
