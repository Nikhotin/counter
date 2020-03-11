const users = require('../app/controllers/users');
const counter = require('../app/controllers/counter');
const auth = require('../app/controllers/auth');
const authMiddleware = require('../app/middleware/auth');

module.exports = (app) => {
  // main page
  app.get('/', (req, res) => res.render('index'));

  // users
  app.get('/users', authMiddleware, users.getAll);
  app.post('/users', users.create);
  app.put('/users/:id', authMiddleware, users.update);
  app.delete('/users/:id', authMiddleware, users.remove);
  app.get('/profile/:id', authMiddleware, (req, res) => {
    const { userId } = req.session;
    res.render('profile', {
      userId,
    });
  });

  // counter
  app.get('/counter', counter.getEveryCount);
  app.get('/counter/:id', authMiddleware, counter.getEveryCountById);
  app.post('/counter', authMiddleware, counter.create);

  // auth
  app.get('/registration', (req, res) => res.render('registry'));
  app.get('/login', (req, res) => res.render('login'));
  app.get('/singin', auth.singIn);
  app.post('/singin', auth.singIn);
  app.get('/logout', (req, res, next) => {
    if (req.session) {
      // delete session object
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    }
  });
};
