module.exports = (express, app) => {
    const controller = require("../controllers/reaction.controller.js");
    const router = express.Router();
    
     // Select all reactions.
    router.get("/", controller.all);

    // Get all user reacts
    router.get("/getReacts/:user", controller.getUserReactions);

    // Make a new reaction
    router.post("/reaction", controller.createReaction);
  
    // Delete a reaction
    router.delete("/delete/:id", controller.deleteReactions);
  
    // Add routes to server.
    app.use("/api/reactions", router);
};