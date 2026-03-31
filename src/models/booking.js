module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      user_email: DataTypes.STRING,
      flight_id: DataTypes.INTEGER,
      seats_booked: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      tableName: "bookings",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at", 
    }
  );

  Booking.associate = (models) => {
    Booking.belongsTo(models.Flight, {
      foreignKey: "flight_id",
      as: "flight",
    });
  };

  return Booking;
};
