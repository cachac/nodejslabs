import mongoose from "mongoose";
import config from "../config/index.js";
import { logger } from "../util/basicLog.js";

mongoose.set("debug", true);

export default {
  setConnetion() {
    const connectionString = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@freetesting.nrujao5.mongodb.net/${config.DB_NAME}`;

    logger.info("Connecting to DB...");

    const db = mongoose.connection;

    db.on("error", function (error) {
      logger.error("Connection Error", error);
    });

    db.once("open", () => {
      logger.info("Database connected");
    });

    return mongoose
      .connect(connectionString, {
        connectTimeoutMS: 5000,
        maxPoolSize: 100,
        writeConcern: {
          w: "majority",
          j: true,
          wtimeout: 5000,
        },
      })
      .catch((error) => {
        console.log("DB Connection error 💥", error);

        process.exit(1);
      });
  },
};
