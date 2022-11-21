import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import routes from "./routes/index.js";
// import { errorHandlers } from "./middlewares/basicErrorHandlers.js";
import { errorHandlers } from "./middlewares/errorHandlers.js";
import { logger } from "./util/logv1.js";
import config from "./config/index.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(routes);
app.use(errorHandlers);

process.on("uncaughtException", (err) => {
  logger.error("AHHHHHHHHHHHHHHHHHHHHHHHHHH! :", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("ERRRRRRRRRRRRRRRRRRRRRRRRRR! :", err);
  process.exit(1);
});

app.listen(config.NODE_PORT, () => {
  logger.info(`Listening to port ${config.NODE_PORT} - Express JS | REST API`);
});

// console.log(
//   `[${config.NODE_ENV}] App: ${config.APP_NAME} v${config.APP_VERSION} listening to port ${config.NODE_PORT} - Express JS | REST`
// );
