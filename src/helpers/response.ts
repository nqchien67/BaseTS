import { Response } from "express";
import { ErrorCode } from "$types/enums";
import { IErrorObject } from "$types/interfaces";
import log from "./log";

export const done = (res: Response, data = null, statusCode = 200): void => {
  const responseBody = { success: true, data };

  if (data && data.paging == true) {
    const { totalItems, totalPages, pageIndex, metadata } = data;
    Object.assign(responseBody, {
      totalPages,
      pageIndex,
      totalItems,
      ...metadata,
      data: data.data,
    });
  }

  if (!data?.notResponse) res.status(statusCode).send(responseBody);
};

export function stop(
  errorCode: ErrorCode,
  devMessage?: string | any,
  statusCode?: number
): IErrorObject {
  statusCode = statusCode || 400;

  return { errorCode, devMessage, statusCode };
}

export const fail = (
  res: Response,
  error: any,
  routeName: string,
  status = 400
): any => {
  log(routeName).error(error);
  const result = { success: false, status, data: null };

  if (error?.errorCode) {
    const status = error?.status || result.status;
    const payload = error?.payload || {};
    Object.assign(result, { status, errorCode: error?.errorCode, payload });
  } else {
    Object.assign(result, { errorCode: ErrorCode.Unknown_Error });
  }

  if (error.devMessage) {
    Object.assign(result, { devMessage: error.devMessage });
  }

  return res.status(status).send(result);
};
