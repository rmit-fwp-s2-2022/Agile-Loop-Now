module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all post.
  router.get("/", controller.all);

  // Create post.
  router.post("/create", controller.create);

  app.use("/api/posts", router);
};
