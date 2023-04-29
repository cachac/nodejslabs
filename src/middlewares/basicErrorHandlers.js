export const errorHandlers = (err, req, res, next) => {
  console.error("err.code :>> ", err.code);
  console.error("err.message :>> ", err.message);
  // send response
  return res
    .status(err.status || 500)
    .send({ errorCode: err.code, errorMessage: err.userMessage });
};
