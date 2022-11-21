import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

process.on("uncaughtException", (err) => {
  console.error("AHHHHHHHHHHHHHHHHHHHHHHHHHH! :", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("ERRRRRRRRRRRRRRRRRRRRRRRRRR! :", err);
  process.exit(1);
});

const NODE_PORT = 3000;
app.listen(NODE_PORT, () => {
  console.log(`Listening to port ${NODE_PORT} - Express JS | REST API`);
});
