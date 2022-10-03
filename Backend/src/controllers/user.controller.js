//The code below is taken from Lectorial code archive week 8
//Writen by Shekhar Kalra

const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

exports.getName = async (req, res) => {
  const user = await db.user.findOne({ where: { name: req.params.user } });

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
  });

  res.json(user);
};

// Update user name in the database
exports.updateName = async (req, res) => {
  const user = await db.user.update({name: req.body.name}, {where: {email: req.params.id}});
  res.json(user);
}


// Update user email in the database
exports.updateEmail = async (req, res) => {
  const user = await db.user.update({email: req.body.newEmail}, {where: {email: req.params.id}});
  res.json(user);
}

// Delete a user from the database
exports.deleteUser = async (req, res) => {
  const user = await db.user.destroy({where: {email: req.params.id}});
  res.json(user);
}