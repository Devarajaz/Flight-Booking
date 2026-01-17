const logger = require("../utils/logger");
const AppError = require('../utils/app-error');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log the error properly using Winston
  logger.error({
    message: err.message,
    status: err.status,
    statusCode: err.statusCode,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  // Operational, trusted error → send exact message to client
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming / unknown error → don't leak details to client
  res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = errorHandler;