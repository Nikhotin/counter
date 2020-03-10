module.exports = (app) => {
  // main page
  app.get('/', (req, res) => res.render('index'));
};
