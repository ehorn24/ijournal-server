const express = require("express");
const UserService = require("./user-service");
const md5 = require("md5");

const userRouter = express.Router();
const jsonParser = express.json();

userRouter
  .route("/")
  .get((req, res, next) => {
    const knexInst = req.app.get("db");
    UserService.getAllUsers(knexInst)
      .then((users) => {
        res.status(200).json(users);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInst = req.app.get("db");
    const newUser = {
      username: req.body.username,
      password: md5(req.body.password),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    for (const [key, value] of Object.entries(newUser)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing ${key} from request body` },
        });
      }
    }
    UserService.createNewUser(knexInst, newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  });

userRouter.route("/login").post(jsonParser, (req, res, next) => {
  const knexInst = req.app.get("db");
  const { username, password } = req.body;
  const retUser = { username, password: md5(password) };
  UserService.authUser(knexInst, retUser.username)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `User ${username} does not exist` });
      } else if (
        user.username === retUser.username &&
        user.password === retUser.password
      ) {
        res.status(200).json({ message: "Logged in!" });
      } else {
        res.status(404).json({ message: "Invalid credentials" });
      }
      res.end();
    })
    .catch(next);
});

userRouter.route("/:id").get((req, res, next) => {
  const knexInst = req.app.get("db");
  const id = req.params.id;
  UserService.getUserById(knexInst, id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ error: { message: `User with ID ${id} does not exist` } });
      }
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = userRouter;
