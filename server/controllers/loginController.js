
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password

  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.status(200).json(user);
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(400).send('Error: could not login');
  }
});

module.exports = router;

