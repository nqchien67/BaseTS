import { fail, stop } from "$helpers/response";
import { ErrorCode } from "$types/enums";
import config from "$config";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IDecodeToken } from "$types/interfaces";

const routeName = "authMiddlewares";

export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bearerToken = req.header("authorization").replace("Bearer ", "");

    if (bearerToken === "null") {
      throw stop(
        ErrorCode.Token_Not_Exist,
        "This API needs authorization!",
        401
      );
    }

    const decoded = verify(
      bearerToken.replace("Bearer ", ""),
      config.AUTH.ACCESS_TOKEN_SECRET,
      {
        algorithms: ["HS256"],
      }
    ) as IDecodeToken;

    Object.assign(req, { userId: decoded.id });

    next();
  } catch (error) {
    return fail(res, error, routeName, 401);
  }
}
