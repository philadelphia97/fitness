const express = require('express');
const router = express.Router();
const { createUser, getUserByUsername, getUserById } = require('./users')
const { userTakenError, PasswordTooShortError } = require('../errors')

// POST /api/users/login

// POST /api/users/register

router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        next(userTakenError);
      }
  
      const user = await createUser({
        username,
        password
      });
  
      res.send({
        user
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
