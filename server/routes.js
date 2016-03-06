var db = require(__dirname + '/database/redis');

module.exports = function(app) {
  app.get('/', function(req, res) {
      res.render('index');
  });
};
