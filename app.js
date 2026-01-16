require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { connectDB } = require("./src/config/db");
const db = require('./src/models');
const errorHandler = require("./src/middleware/error-middleware");
const logger = require("./src/middleware/logger");
const catchAsync = require("./src/utils/catch-async");
const AppError = require("./src/utils/app-error");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Request logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// -------- HEALTH ROUTE --------
app.get(
  "/",
  catchAsync(async (req, res) => {
    res.send("Flight Booking API is running 🚀");
  })
);

// -------- TEST ERROR ROUTE (to check logging) --------
app.get(
  "/error",
  catchAsync(async (req, res, next) => {
    throw new AppError("This is a test error", 500);
  })
);

// -------- 404 ROUTE --------
app.all("/",(req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// -------- ERROR HANDLER (MUST BE LAST) --------
app.use(errorHandler);

// -------- START SERVER --------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await db.sequelize.sync({ alter: true });
};

startServer();