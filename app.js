require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("./src/config/db");
const db = require("./src/models");
const errorHandler = require("./src/middleware/error-middleware");
const logger = require("./src/utils/logger");
const AppError = require("./src/utils/app-error");
const authRouter = require("./src/routes/auth-routes");
const airplaneRoutes = require("./src/routes/airplane-routes")
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/airplanes", airplaneRoutes);

// -------- 404 ROUTE --------
app.all("/",(req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// -------- ERROR HANDLER (MUST BE LAST) --------
app.use(errorHandler);

// -------- START SERVER --------
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to PostgreSQL

    // Sync models (use alter: true only in dev)
    const db = require("./src/models");
    await db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      console.log(`🚀 Server started on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed", { error: error.message });
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();