import express from "express";
import { sticky } from "../util/sticky.js";
import { TEST } from "../controllers/user.js";
import * as post from "../controllers/post.js";

const router = express.Router();

// health checks
const APP_NAME = "nodejs app";
const APP_VERSION = "1.0.0";
router.get("/healthcheck", (_, res) => {
  res.send({ app: APP_NAME, version: APP_VERSION, sticky });
});

router.post("/test", TEST);

// POST CRUD
router.post("/post/create", post.CREATE);
router.get("/post/readall", post.READ_ALL);
router.post("/post/readbyid", post.READ_BY_ID);
router.post("/post/delete", post.DELETE);
router.post("/post/update", post.UPDATE);

export default router;
