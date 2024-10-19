import mongoose from "mongoose";
import { TErrorSource, TReturnError } from "../interface/erros/error";

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TReturnError => {
  const errorSources: TErrorSource[] = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;
