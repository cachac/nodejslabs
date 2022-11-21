export const errorHandlers = (err, req, res, next) => {
  console.log("err.message :>> ", err.message);
  console.log("err.code :>> ", err.code);
  // send response
  return res
    .status(500)
    .send({ errorCode: err.code, errorMessage: err.message });
};
