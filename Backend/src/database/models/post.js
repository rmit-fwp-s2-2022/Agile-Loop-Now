//Model for posts
module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    timeStamp: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  });
