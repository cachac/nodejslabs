import { logger } from "../util/logv2.js";

// export const errorHandlers = (err, req, res, next) => {
//   // logger
//   err.message = err.message && Object.keys(err.message).length ? JSON.stringify(err.message, null, 2) : err.message

//   logger.error(`[${err.code}] ${err.userMessage || ''} [${err.message || '...'}]. (${req.originalUrl} - ${req.method} - ${req.ip})`)
//   // user message
//   err.message =
//     req.app.get('env') === 'dev' || req.app.get('env') === 'development' ? `${err.userMessage || ''} [${err.message || '...'}]` : err.userMessage
//   // send response
//   return res.status(err.status || 500).send({ errorCode: err.code, errorMessage: err.message })
// }

export const errorHandler = (err, req, res, next) => {
  const isObject = err.message && typeof err.message === "object";

  logger.error(
    `Code: [${err.code}]  (${req.originalUrl} - ${req.method} - ${req.ip}) ${
      !isObject ? err.message : ""
    }`,
    err.message
  );

  return res
    .status(err.status || 500)
    .send({ errorCode: err.code, errorMessage: err.userMessage });
};
