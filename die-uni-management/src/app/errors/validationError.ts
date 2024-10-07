import mongoose from "mongoose";
import { TErrorSource } from "../interface/erros/error";
import { returnError } from "./zodError";

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): returnError => {
  const errorSources: TErrorSource[] = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val.message,
      };
    },
  );
  const statusCodes = 400;
  return {
    statusCodes: statusCodes,
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;
