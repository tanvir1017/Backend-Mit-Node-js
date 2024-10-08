// Middleware For Data Sanitization

import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const sanitizeClientDataViaZod =
  (schema: AnyZodObject) =>
  async (req: Request, __res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      return next();
    } catch (error) {
      next(error);
    }
  };

export default sanitizeClientDataViaZod;
