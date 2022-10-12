const db = require("../database");
const argon2 = require("argon2");


exports.createFollow = async (req, res) => {
    const follow = await db.follow.create({
      user_email: req.body.user_email,
      follower_email: req.body.user_email,
    });
  
    res.json(follow);
  };


exports.deleteFollow = async (req, res) => {
    const follow = await db.follow.destroy({where: {id: req.params.id}});
    res.json(follow);
}

exports.getUserFollows = async (req, res) => {
    const follows = await db.follow.findAll({where: {user_email: req.params.user}});
    res.json(follows);
}