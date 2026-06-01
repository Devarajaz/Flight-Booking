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
db.TempUser = require("./temp-user")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.Airline = require("./airline")(sequelize, DataTypes);
db.Airplane = require("./airplane")(sequelize, DataTypes);
db.Airport = require("./airport")(sequelize, DataTypes);
db.Flight = require("./flights")(sequelize, DataTypes);
db.Booking = require("./booking")(sequelize, DataTypes);
db.Payment = require("./payment")(sequelize, DataTypes);

// ✅ CALL ASSOCIATIONS HERE (VERY IMPORTANT)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export
db.connectDB = connectDB;
module.exports = db;
