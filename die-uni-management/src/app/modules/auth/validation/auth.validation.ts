import z from "zod";

const validateLoginUser = z.object({
  body: z.object({
    id: z.string({ required_error: "id must be provided" }),
    password: z.string({ required_error: "password must be provided" }),
  }),
});

export const ValidateAuthUserViaZOD = {
  validateLoginUser,
};
