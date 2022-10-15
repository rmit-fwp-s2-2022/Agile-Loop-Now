module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "follow",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_email: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
