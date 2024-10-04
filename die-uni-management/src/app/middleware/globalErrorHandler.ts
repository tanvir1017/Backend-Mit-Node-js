import { NextFunction, Request, Response } from "express";

// TODO => Global error handler
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statuscode = error.statusCode || 500;
  const message = error.message || "Something went wrong!";
  return res.status(statuscode).json({ success: false, message, error });
};

export default globalErrorHandler;
