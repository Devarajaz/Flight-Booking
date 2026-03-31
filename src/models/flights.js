module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define(
    "Flights",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      airline_id: DataTypes.INTEGER,
      airplane_id: DataTypes.INTEGER,
      from_airport_id: DataTypes.INTEGER,
      to_airport_id: DataTypes.INTEGER,
      departure_time: DataTypes.DATE,
      ticket_cost: DataTypes.FLOAT,
    },
    {
      tableName: "flights",
      underscored: true,
      timestamps: true,
    }
  );

  Flight.associate = (models) => {
  Flight.belongsTo(models.Airline, {
    foreignKey: "airline_id",
    as: "airline",
  });

  Flight.belongsTo(models.Airplane, {
    foreignKey: "airplane_id",
    as: "airplane",
  });

  Flight.belongsTo(models.Airport, {
    foreignKey: "from_airport_id",
    as: "fromAirport",
  });

  Flight.belongsTo(models.Airport, {
    foreignKey: "to_airport_id",
    as: "toAirport",
  });
 };

 return Flight;

};
