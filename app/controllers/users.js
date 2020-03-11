/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/app');

const User = mongoose.model('User');

const getAll = (req, res) => {
  User.find()
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};

const create = (req, res) => {
  User.create(req.body)
    .then((user) => {
      const token = jwt.sign(user._id.toString(), jwtSecret);
      req.session.userId = user._id.toString();
      req.session.token = token;
      res.redirect(`/counter/${req.session.userId}`);
    })
    .catch((err) => res.status(500).json(err));
};

const update = (req, res) => {
  User.findOneAndUpdate({ name: req.params.name }, req.body)
    .exec()
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

const remove = (req, res) => {
  User.deleteOne({ id: req.params.id })
    .exec()
    .then(() => res.json({ succes: true }))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
