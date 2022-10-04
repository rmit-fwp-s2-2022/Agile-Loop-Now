module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all post.
  router.get("/", controller.allPost);

  // Create post.
  router.post("/create", controller.createPost);

  app.use("/api/posts", router);
};
