import AppRoute from "$helpers/route";
import { validate } from "$helpers/validate";
import { verifyAccessToken } from "$middlewares/auth";
import {
  changePassword,
  getDetailUser,
  getListUser,
  login,
  register,
} from "$services/auth";
import {
  changePasswordSchema,
  getDetailUserSchema,
  getListUserSchema,
  loginSchema,
  registerSchema,
} from "$validators/auth";
import { NextFunction, Request } from "express";
import { MetadataWithSuchNameAlreadyExistsError } from "typeorm";

const Controller = new AppRoute("authController", "/auth");

Controller.post("/login", [], async (req: Request) => {
  validate(loginSchema, req.body);
  console.log(login);
  const result = await login(req.body);

  return result;
});

Controller.post("/register", [], async (req: Request) => {
  validate(registerSchema, req.body);

  const result = await register(req.body);
  return result;
});

Controller.put(
  "/change-password",
  [verifyAccessToken],
  async (req: Request) => {
    validate(changePasswordSchema, req.body);
    const result = await changePassword(req.body, req.userId);

    return result;
  }
);

Controller.get("/get-list-user", [], async (req: Request) => {
  const keyword = req.body.keyword;
  validate(getListUserSchema, keyword);
  const result = await getListUser(keyword);

  return result;
});

Controller.get("/get-detail-user", [], async (req: Request) => {
  const userId = req.body.userId;
  validate(getDetailUserSchema, userId);
  const result = await getDetailUser(userId);

  return result;
});
