const db = require("../database");

exports.allPost = async (req, res) => {
  const posts = await db.post.findAll();
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = await db.post.create({
    content: req.body.content,
    link: req.body.link,
    timeStamp: req.body.timeStamp,
    userEmail: req.body.userEmail,
  });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const user = await db.post.destroy({ where: { post_id: req.params.id } });
  res.json(user);
};

exports.updatePost = async (req, res) => {
  const post = await db.post.update(
    { content: req.body.content, link: req.body.link },
    { where: { post_id: req.params.id } }
  );
  res.json(post);
};
