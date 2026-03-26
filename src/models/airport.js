module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define(
    "Airport",
    {
      name: DataTypes.STRING,
      iata_code: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      tableName: "airports",
      underscored: true,
      timestamps: true,
    }
  );

  Airport.associate = (models) => {
    Airport.hasMany(models.Flight, {
      foreignKey: "from_airport_id",
      as: "departures",
    });

    Airport.hasMany(models.Flight, {
      foreignKey: "to_airport_id",
      as: "arrivals",
    });

  };
  return Airport;
};
