module.exports = (sequelize, DataTypes) => {
  const Airplane = sequelize.define(
    "Airplane",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      model: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
    },
    {
      tableName: "airplanes",
      underscored: true,
      timestamps: true,
    }
  );

  return Airplane;
};

