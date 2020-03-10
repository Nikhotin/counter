const users = require('../app/controllers/users');
const counter = require('../app/controllers/counter');
const auth = require('../app/controllers/auth');
const authMiddleware = require('../app/middleware/auth');

module.exports = (app) => {
  // main page
  app.get('/', (req, res) => res.render('index'));

  // users
  app.get('/users', authMiddleware, users.getAll);
  app.post('/users', authMiddleware, users.create);
  app.put('/users/:userId', authMiddleware, users.update);
  app.delete('/users/:userId', authMiddleware, users.remove);
  app.get('/profile/:userId', (req, res) => res.render('profile'));

  // counter
  app.get('/counter', counter.getEveryCount);
  app.get('/counter/:userId', counter.getEveryCountById);
  app.post('/counter', authMiddleware, counter.create);

  // auth
  app.get('/registration', (req, res) => res.render('registry'));
  app.get('/login', (req, res) => res.render('login'));
  // app.get('/logout');
  app.post('/singin', auth.singIn);
};
