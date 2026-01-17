module.exports = (sequelize, DataTypes) => {
  const TempUser = sequelize.define(
    "TempUser",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
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
    },
    {
      tableName: "TempUsers",
      timestamps: true,
    }
  );

  return TempUser;
};