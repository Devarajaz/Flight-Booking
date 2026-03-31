const { underscoredIf } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define(
    "Airline",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      tableName: "airlines",
      underscored: true,
      timestamps: true,
    }
  );

  Airline.associate = (models) => {
    Airline.hasMany(models.Flight, {
      foreignKey: "airline_id",
    });
  };

  return Airline;
};

