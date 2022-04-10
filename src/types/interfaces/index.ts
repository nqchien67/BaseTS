import { ErrorCode } from "$types/enums";
import { NextFunction, Request, Response } from "express";

export interface IErrorObject {
  statusCode?: number;
  errorCode?: ErrorCode;
  errorMessage?: string;
  devMessage?: string;
}

export interface IRouteHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IDecodeToken {
  id: string;
}
