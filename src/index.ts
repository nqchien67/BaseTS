require("dotenv").config();
import "module-alias/register";
require("./require");
import express from "express";
import { createServer } from "http";
import log from "$helpers/log";
import createMongoConnection from "$helpers/mongo";
import config from "$config";
import logRequest from "$middlewares/logRequest";
import { errorHandler } from "$middlewares/response";
import { stop } from "$helpers/response";
import { ErrorCode } from "$types/enums";
import { RootRoute } from "$helpers/route";
import rateLimit from "express-rate-limit";
import { createConnection } from "typeorm";

const limiter = rateLimit({
  windowMs: 60 * 1000, //1p
  max: 400, // 400 req/1p
  message: `{
    "success": false,
    "errorCode": "Maximum_Request,
    "errorMessage": "Maximum_Request",
    "devMessage": "To many request"
  }`,
});

const logger = log("Index");

const app = express();
const http = createServer(app);

createConnection()
  .then(() => {
    app.use(limiter);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(logRequest);

    app.use(RootRoute);

    // app.use(errorHandler);

    http.listen(config.SERVER.PORT, () => {
      logger.info(
        `Express server started on port ${config.SERVER.PORT}. Environment: ${config.SERVER.NODE_ENV}`
      );
    });
  })
  .catch((error) => {
    logger.error(error);
  });
