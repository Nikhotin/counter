const mongoose = require('mongoose');

const Counter = mongoose.model('Counter');

const getEveryCount = async (req, res) => {
  const coffeeCount = await Counter.countDocuments()
    .where('category')
    .equals('Чашка кофе');

  const beerCount = await Counter.countDocuments()
    .where('category')
    .equals('Банка пива');

  const pizzaCount = await Counter.countDocuments()
    .where('category')
    .equals('Пицца');

  const cookieCount = await Counter.countDocuments()
    .where('category')
    .equals('Печенька');

  res.render('counter', {
    coffeeCount,
    beerCount,
    pizzaCount,
    cookieCount,
  });
};

const getEveryCountById = async (req, res) => {
  const { userId } = req.params;

  const coffeeCount = await Counter.countDocuments()
    .where('category')
    .equals('Чашка кофе')
    .where('userId')
    .equals(userId);

  const beerCount = await Counter.countDocuments()
    .where('category')
    .equals('Банка пива')
    .where('userId')
    .equals(userId);

  const pizzaCount = await Counter.countDocuments()
    .where('category')
    .equals('Пицца')
    .where('userId')
    .equals(userId);

  const cookieCount = await Counter.countDocuments()
    .where('category')
    .equals('Печенька')
    .where('userId')
    .equals(userId);

  res.render('myCounter', {
    coffeeCount,
    beerCount,
    pizzaCount,
    cookieCount,
  });
};

const create = (req, res) => {
  Counter.create(req.body)
    .then((createdCounter) => res.json(createdCounter))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getEveryCount,
  getEveryCountById,
  create,
};
