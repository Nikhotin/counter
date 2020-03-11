/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/app');

const User = mongoose.model('User');

const singIn = (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'User does not exist!' });
      }
      const isValid = bCrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign(user._id.toString(), jwtSecret);
        req.session.userId = user._id.toString();
        req.session.token = token;
        res.redirect(`/counter/${req.session.userId}`);
      } else {
        res.status(401).json({ message: 'Invalid credentials!' });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = {
  singIn,
};
