//The code below is taken from Lectorial code archive week 7
//Writen by Shekhar Kalra

module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select user with name provided
  router.get("/getUser/:user", controller.getName);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Update user name.
  router.put("/updatename/:id", controller.updateName);

  // Update user email.
  router.put("/updateEmail/:id", controller.updateEmail);

    // Update user email.
  router.delete("/delete/:id", controller.deleteUser);

  // Add routes to server.
  app.use("/api/users", router);
};
