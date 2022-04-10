import { IRouteHandler } from '$types/interfaces';
import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { done, stop } from './response';
import log from './log';
import { ErrorCode } from '$types/enums';

export const RootRoute = Router();

class AppRoute {
  private _name: string;
  private _basePath: string;

  constructor(name: string, basePath: string = '') {
    this._name = name;
    this._basePath = basePath;
  }

  public get(path: string, middlewares: RequestHandler[], handler: IRouteHandler) {
    RootRoute.get(this.getPath(path), middlewares, wrapper(handler, this._name));
  }

  public post(path: string, middlewares: RequestHandler[], handler: IRouteHandler) {
    RootRoute.post(this.getPath(path), middlewares, wrapper(handler, this._name));
  }

  public put(path: string, middlewares: RequestHandler[], handler: IRouteHandler) {
    RootRoute.put(this.getPath(path), middlewares, wrapper(handler, this._name));
  }

  public delete(path: string, middlewares: RequestHandler[], handler: IRouteHandler) {
    RootRoute.delete(this.getPath(path), middlewares, wrapper(handler, this._name));
  }

  private getPath(path: string) {
    return `${this._basePath + path}`.replace('//', '/');
  }
}

function wrapper(handler: IRouteHandler, routeName: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next)
      .then((result: unknown) => done(res, result))
      .catch((err: any) => {
        log(routeName).error(err);

        const { statusCode, ...errorResponse } = err;
        errorResponse.success = 'false';

        return res.status(statusCode).send(errorResponse);
      });
  };
}

export default AppRoute;
