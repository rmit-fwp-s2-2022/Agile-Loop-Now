//The code below is taken from Lectorial code archive week 8
//Writen by Shekhar Kalra

const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);

db.follow = require("./models/follow.js")(db.sequelize, DataTypes);

db.reaction = require("./models/follow.js")(db.sequelize, DataTypes);
// db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Relate user and follows.
// db.user.hasMany(db.follow, {foreignKey: 'user_email'});
// db.user.hasMany(db.follow, {foreignKey: 'follower_email'});

db.post = require("./models/post.js")(db.sequelize, DataTypes);

// Relate post and user.
db.post.belongsTo(db.user, {
  foreignKey: { userEmail: "email", allowNull: false },
});

db.reaction.belongsTo(db.post, {
  foreignKey: { post_id: "post_id", allowNull: false },
});

db.follow.belongsTo(db.user, {
  foreignKey: { user_email: "email", allowNull: false },
});

// db.follow.belongsTo(db.user, { foreignKey: 'user_email'});
// db.follow.belongsTo(db.user, { foreignKey: 'follower_email'});
// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const count = await db.user.count();
  const follows = await db.follow.count();


  // await db.follow.create({ user_email: "mbolger@mail.com", follower_email: "mail@m.com"});

  // if (postNum > 0) return;

  // await db.post.create({
  //   userEmail: "test@mail.com",
  //   content: "Here is a picture of a thing",
  //   link: "https://res.cloudinary.com/aglie-loop/image/upload/v1664268665/my-uploads/hgvxdzyz80zuyh2blz9t.jpg",
  //   timeStamp: "21 March 2022",
  // });

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    email: "mbolger@mail.com",
    password_hash: hash,
    name: "Matthew",
  });

  hash = await argon2.hash("def456", { type: argon2.argon2id });

  await db.user.create({
    email: "shekhar@mail.com",
    password_hash: hash,
    name: "Shekhar",
  });

  hash = await argon2.hash("Password12#", { type: argon2.argon2id });
  await db.user.create({
    email: "test@mail.com",
    password_hash: hash,
    name: "test",
  });

}

module.exports = db;
