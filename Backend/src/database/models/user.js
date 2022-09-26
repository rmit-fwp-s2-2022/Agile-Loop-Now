//The code below is taken from Lectorial code archive week 8
//Writen by Shekhar Kalra

module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(64),
      primaryKey: true
    },
    password_hash: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
  }, {
    timestamps: true
  });
