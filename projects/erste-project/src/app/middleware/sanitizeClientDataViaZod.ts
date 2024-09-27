// Middleware For Data Sanitization

import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

/**
 * @param schema  A Middleware for data sanitization or body validation
 * @returns {function} next()
 */
const sanitizeClientDataViaZod =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
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
