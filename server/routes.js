var controller = require(__dirname + '/controllers/main');

module.exports = function(app) {
  app.get('/', function(req, res) {
		// console.log(db.use);
		// console.log('here');
    //   res.render('index');
  });
	app.get('/test', function(req, res) {
		controller.insert(req, res);
	});
	app.get('/script', function(req, res) {
		controller.script(req, res);
	});
	app.get('/runscript', function(req, res) {
		controller.runscript(req, res);
	});
};
