import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import handleValidationError from "../errors/validationError";
import handleZodError from "../errors/zodError";
import { TErrorSource } from "../interface/erros/error";

// TODO => Global error handler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, __next) => {
  // TODO  => Default sources
  let statuscode = error.statusCode || 500;
  let message = error.message || "Something went wrong!";

  let errorSources: TErrorSource[] = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (error instanceof ZodError) {
    const simplifyZodError = handleZodError(error);

    statuscode = simplifyZodError?.statusCodes;
    message = simplifyZodError?.message;
    errorSources = simplifyZodError?.errorSources;
  } else if (error?.name === "ValidationError") {
    const simplifyValidationError = handleValidationError(error);

    (statuscode = simplifyValidationError?.statusCodes),
      (message = simplifyValidationError?.message),
      (errorSources = simplifyValidationError?.errorSources);
  }

  return res.status(statuscode).json({
    success: false,
    message,
    errorSources,
    //error,
    stack: config.NODE_ENV !== "production" ? error?.stack : null,
  });
};

export default globalErrorHandler;
