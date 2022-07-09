const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername
} = require('../db');
const { userTakenError, UserDoesNotExistError } = require("../errors");


// POST /api/users/login
router.post('/login', async (req, res, next) => {
  try {
      const user = await getUser(req.body)
      const confirmation = {
          message: "you're logged in!",
          token: user.token
      }
      delete user.token;
      confirmation.user = user
      res.send(confirmation);
  } catch (error) {
      next(error)
  }
});

// POST /api/users/register



router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);
    
    

    if (_user) {
      next(userTakenError);
    }


    const user = await createUser({
      username: username,
      password: password
    });


    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET
    );
    console.log()

    const data = {
      message: "Thank you for registering",
      token: token,
      user: user
    };

    res.send(data);

  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me
router.get("/me", async (req, res, next) => {
try {
  res.send(req.user)

} catch (UserDoesNotExistError) {
  console.error(this.name)
  next(this.name);
}
})

// GET /api/users/:username/routines

module.exports = router;
