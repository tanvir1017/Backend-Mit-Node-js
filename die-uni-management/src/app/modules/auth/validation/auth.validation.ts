import z from "zod";

const validateLoginUser = z.object({
  body: z.object({
    id: z.string({ required_error: "id must be provided" }),
    password: z.string({ required_error: "password must be provided" }),
  }),
});

const validatePreUser = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password must be provided" }),
    newPassword: z.string({ required_error: "password must be provided" }),
    // confirmPassword: z.string({
    //   required_error: "password and confirm password didn't match",
    // }),
  }),
});

export const ValidateAuthUserViaZOD = {
  validateLoginUser,
  validatePreUser,
};
