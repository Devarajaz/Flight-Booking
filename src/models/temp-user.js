module.exports = (sequelize, DataTypes) => {
  const TempUser = sequelize.define(
    "TempUser",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otpExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sessionId: {
        type: DataTypes.STRING,
        allowNull: true, // can store JWT or session id
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "temp_users",
      timestamps: true,
    }
  );

  return TempUser;
};
