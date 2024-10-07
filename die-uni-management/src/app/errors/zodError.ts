import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/erros/error";

export type returnError = {
  statusCodes: number;
  message: string;
  errorSources: TErrorSource[];
};
const handleZodError = (error: ZodError): returnError => {
  const errorSources: TErrorSource[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCodes = 400;
  return {
    statusCodes,
    message: "Validation error",
    errorSources,
  };
};

export default handleZodError;
