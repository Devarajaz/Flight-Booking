module.exports = (sequelize, DataTypes) => {
  const Airplane = sequelize.define(
    "Airplane",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      airline_id: {
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
