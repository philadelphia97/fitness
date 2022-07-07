const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername, getUserById } = require("./users");
const { userTakenError, PasswordTooShortError } = require("../errors");

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    console.log("this is the function", getUserByUsername)
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET
      );
      //create token & return to user
      res.send({
        message: "You're logged in!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /api/users/register



router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    console.log("Phil data--------");
    const _user = await getUserByUsername(username);

    if (_user) {
      next(userTakenError);
    }

    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    const data = {
      message: "Thanks for registering",
      token,
      user,
    };

    res.send(data);

  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
