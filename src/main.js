import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import routes from "./routes/index.js";
// import { errorHandlers } from "./middlewares/basicErrorHandlers.js";
import { errorHandlers } from "./middlewares/errorHandlers.js";
import { logger } from "./util/log.js";

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

const NODE_PORT = 3000;
app.listen(NODE_PORT, () => {
  logger.info(`Listening to port ${NODE_PORT} - Express JS | REST API`);
});
