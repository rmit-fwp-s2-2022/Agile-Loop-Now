const db = require("../database");
const argon2 = require("argon2");


exports.all = async (req, res) => {
    const reactions = await db.reaction.findAll();
    res.json(reactions);
};


exports.createReaction = async (req, res) => {
    console.log(req.body);
    const reaction = await db.reaction.create({
        user_email: req.body.user_email,
        post_id: req.body.post_id,
        reaction: req.body.reaction
    });

    res.json(reaction);
};

exports.deleteReactions = async (req, res) => {
  const reaction = await db.reaction.destroy({ where: { id: req.params.id } });
  res.json(reaction);
};

exports.getUserReactions = async (req, res) => {
  const reaction = await db.reaction.findAll({
    where: { user_email: req.params.user },
  });
  res.json(reaction);
};
