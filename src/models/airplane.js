module.exports = (sequelize, DataTypes) => {
  const Airplane = sequelize.define(
    "Airplane",
    {
      airline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      economy_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      business_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_class_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "airplanes",
      underscored: true,
      timestamps: true,
    }
  );

  return Airplane;
};
