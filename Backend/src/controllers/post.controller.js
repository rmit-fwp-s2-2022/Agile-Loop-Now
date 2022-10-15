const db = require("../database");
const { Op } = require("sequelize");

exports.allPost = async (req, res) => {
  const posts = await db.post.findAll({
    where: { parent_id: null },
  });
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = await db.post.create({
    content: req.body.content,
    link: req.body.link,
    userEmail: req.body.userEmail,
  });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await db.post.destroy({ where: { post_id: req.params.id } });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await db.post.update(
    { content: req.body.content, link: req.body.link },
    { where: { post_id: req.params.id } }
  );
  res.json(post);
};

exports.updatePostContent = async (req, res) => {
  const post = await db.post.update(
    { content: req.body.content },
    { where: { post_id: req.params.id } }
  );
  res.json(post);
};

exports.createComment = async (req, res) => {
  const comment = await db.post.create({
    content: req.body.content,
    link: "",
    userEmail: req.body.userEmail,
    parent_id: req.body.parent_id,
  });
  res.json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await db.post.findAll({
    where: { parent_id: { [Op.ne]: null } },
  });
  res.json(comments);
};
