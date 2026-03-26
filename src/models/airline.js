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
      timestamps: true,
    }
  );

  Airline.associate = (models) => {
    console.log("Flight inside Airline:", models.Flights);
    Airline.hasMany(models.Flight, {
      foreignKey: "airline_id",
    });
  };

  return Airline;
};

