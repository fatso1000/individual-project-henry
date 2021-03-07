import { NextFunction, Request } from "express";
import { ValidationOptions } from "joi";

export default function validateRequest(req: Request, next: NextFunction, schema: any) {
  const options: ValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(
      `Petition data validation error: ${error.details
        .map((x: any) => x.message)
        .join(", ")}`
    );
  } else {
    req.body = value;
    next();
  }
}
