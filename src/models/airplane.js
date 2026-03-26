module.exports = (sequelize, DataTypes) => {
  const Airplane = sequelize.define(
    "Airplane",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      model: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      tableName: "airplanes",
      timestamps: true,
    }
  );

  Airplane.associate = (models) => {
    Airplane.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Airplane;
};

