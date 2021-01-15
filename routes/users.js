const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
