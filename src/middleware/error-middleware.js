const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational
      ? err.message
      : "Something went wrong on the server!",
  });
};

module.exports = errorHandler;