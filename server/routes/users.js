const express = require('express');
const Router = express.Router();

const User = require('../models/user');
const auth = require('../middleware/auth');

Router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    // image: req.user.image,
  });
});

Router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userData) => {
    if (err) res.json({ success: false, err });
    res.status(200).json({ success: true, userData });
  });
});

Router.post('/login', (req, res) => {
  // find the user by email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'User not found...',
      });

    // compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      // generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('user_authExp', user.tokenExp);
        res.cookie('user_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

Router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = Router;
