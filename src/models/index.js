const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

// Function to test DB connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
};


// Models container
const db = {};

// Attach Sequelize instance
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.TempUser = require("./temp-user")(sequelize, DataTypes); // Temporary user for OTP
db.User = require("./user")(sequelize, DataTypes); // Permanent user (after booking)

// Export
module.exports = db;
module.exports.connectDB = connectDB;
