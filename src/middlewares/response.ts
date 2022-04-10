import config from "$config";
import { IErrorObject } from "$types/interfaces";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  errorObject: IErrorObject,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { statusCode, ...errorResponse } = errorObject;

  if (config.SERVER.NODE_ENV === "production") {
    delete errorResponse.devMessage;
  }

  res.status(statusCode).send(errorResponse);
}
