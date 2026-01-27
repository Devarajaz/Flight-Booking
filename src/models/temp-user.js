module.exports = (sequelize, DataTypes) => {
  const TempUser = sequelize.define(
    "TempUser",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      otp: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },

      otpExpiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "otp_expires_at",
      },

      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_verified",
      },
    },
    {
      tableName: "temp_users",
      underscored: true,
      timestamps: true,
      indexes: [
        { fields: ["email"] },
        { fields: ["otp"] },
      ],
    }
  );

  return TempUser;
};