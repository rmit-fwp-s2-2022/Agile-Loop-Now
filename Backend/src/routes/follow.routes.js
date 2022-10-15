module.exports = (express, app) => {
    const controller = require("../controllers/follow.controller.js");
    const router = express.Router();
  
    // Get all user follows
    router.get("/getUser/:user", controller.getUserFollows);

    // Check if a user is following a certain user
    router.get("/isfollowing", controller.isFollowing);
  
    // Follow a user.
    router.post("/follow", controller.createFollow);
  
    // Unfollow a user.
    router.delete("/unfollow/:id", controller.deleteFollow);
  
    // Add routes to server.
    app.use("/api/follows", router);
  };