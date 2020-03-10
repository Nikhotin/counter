const users = require('../app/controllers/users');
const counter = require('../app/controllers/counter');

module.exports = (app) => {
  // main page
  app.get('/', (req, res) => res.render('index'));

  // users
  app.get('/users', users.getAll);
  app.post('/users', users.create);
  app.put('/users/:userId', users.update);
  app.delete('/users/:userId', users.remove);
  app.get('/profile/:userId', (req, res) => res.render('profile'));

  // counter
  app.get('/counter', counter.getEveryCount);
  app.get('/counter/:userId', counter.getEveryCountById);
  app.post('/counter', counter.create);
};
