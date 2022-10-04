const db = require("../database");

exports.allPost = async (req, res) => {
  const posts = await db.post.findAll();
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = await db.post.create({
    username: req.body.username,
    content: req.body.content,
    link: req.body.link,
    timeStamp: req.body.timeStamp,
    userEmail: req.body.userEmail,
  });

  res.json(post);
};
