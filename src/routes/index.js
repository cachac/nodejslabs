import express from "express";
import { sticky } from "../util/sticky.js";
import { TEST } from "../controllers/user.js";

const router = express.Router();

// health checks
const APP_NAME = "nodejs app";
const APP_VERSION = "1.0.0";
router.get("/healthcheck", (_, res) => {
  res.send({ app: APP_NAME, version: APP_VERSION, sticky });
});

router.post("/test", TEST);

export default router;
