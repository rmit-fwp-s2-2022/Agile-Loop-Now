const db = require("../database");

exports.all = async (req, res) => {
  const posts = await db.post.findAll();
  res.json(posts);
};

exports.create = async (req, res) => {
  const post = await db.user.create({
    user: req.name,
    email: req.email,
    content: req.content,
    link: req.link,
    time: req.timeStamp,
  });

  res.json(post);
};
