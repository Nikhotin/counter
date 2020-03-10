const mongoose = require('mongoose');

const User = mongoose.model('User');

const getAll = (req, res) => {
  User.find()
    .exec()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};

const create = (req, res) => {
  User.create(req.body)
    .then((createdUser) => res.json(createdUser))
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
