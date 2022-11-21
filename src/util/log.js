import winston, { createLogger, format } from "winston";
import { sticky } from "../util/sticky.js";

const { combine, timestamp, label, metadata, printf } = format;

const options = {
  info: {
    level: "info",
    filename: `logs/app.log`,
    handleExceptions: true,
    maxsize: 10000000, // 10MB
    maxFiles: 5,
  },
  error: {
    level: "error",
    filename: `logs/error.log`,
    handleExceptions: true,
    maxsize: 5000000, // 5MB
    maxFiles: 5,
  },
};

const logFormat = printf(
  ({ level, message, timestamp, label, metadata }) =>
    `${timestamp}  [${label}] ${level}: ${message}. ${
      metadata && Object.keys(metadata).length
        ? `\n  metadata: ${JSON.stringify(metadata, null, 2)}`
        : ""
    }`
);

export const logger = createLogger({
  level: "info",
  format: combine(
    label({ label: sticky }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
    logFormat
  ),
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.File(options.info),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.add(
  new winston.transports.Console({
    format: combine(
      label({ label: sticky }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
      // logFormat
    ),
  })
);

// exceptionHandlers: [new transports.File({ filename: "exceptions.log" })],
// rejectionHandlers: [new transports.File({ filename: "rejections.log" })],
