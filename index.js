/**
		-----------------------
		SET UP APP VARS | START
		-----------------------
**/
var express				= require('express');
var app						= express();
var path					= require('path');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');		// Handle post data-require bodyparser
var nconf					= require('nconf');
var routes, db, start, exit;

global.LOG = require(path.join(__dirname, 'server/logger'));

/**
		---------------------
		SET UP APP VARS | END
		---------------------
**/

/**
		-----------------------
		PROCESS SECTION | START
		-----------------------
**/

start = function() {
	console.log("\r\n\
	               _\r\n\
	             / '_)  NODE STARTED! OMG!\r\n\
	    _.----._/  /\r\n\
	   /          /\r\n\
	 _/  (   | ( |\r\n\
	/__.-|_|--|_|\r\n\
	______________________________________\r\n\
	@ASCII from nano.js \r\n\
	\r\n");
}

exit = function(options, err) {
	if (options.cleanup) {
		console.log("\r\n\
                                           /~|                           \r\n\
                                          ( oo)    They've shut down     \r\n\
                                          _|=|_    the main reactor.     \r\n\
                           ___        #  /  _   |                        \r\n\
                  BYE    / () |      || //|/.||||                        \r\n\
                       _|_____|_      |/  ||. |||                      \r\n\
                      | | === | |         || /|||                       \r\n\
                      |_|  O  |_|         |_ _| #                       \r\n\
                       ||  O  ||          | | |                          \r\n\
                       ||__*__||          | | |                          \r\n\
                      |~ |___| ~|         []|[]                          \r\n\
                      /=| /=| /=|         | | |                          \r\n\
      ________________[_]_[_]_[_]________/_]_[_|_________________________\r\n\
      @ASCII from towel.blinkenlights.nl \r\n");
	}
	if (err) {
		console.log(err.stack);
		LOG(err.stack);
	}
	if (options.exit) process.exit();
}

//prevents from automatically closing, have some exit handlers run
process.stdin.resume();
start();

//do something when app is closing
process.on('exit', exit.bind(null, { cleanup : true }));
process.on('SIGINT', exit.bind(null, { exit : true }));
process.on('uncaughtException', exit.bind(null, { exit : true }));
/**
		---------------------
		PROCESS SECTION | END
		---------------------
**/

/**
		---------------------
		SET UP CONFIG | START
		---------------------
**/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
nconf.argv().env().file({ file: path.join(__dirname, 'config_' + process.env.NODE_ENV + '.json') });
LOG.info('Node ENV: ' + process.env.NODE_ENV);
/**
		-------------------
		SET UP CONFIG | END
		-------------------
**/

/**
		--------------------------
		SET UP EXPRESS APP | START
		--------------------------
**/
//set up app view
app.set("view options", { layout: false });
app.use(express.static(path.join(__dirname, 'public')));

//posts and cookies
app.use(bodyParser.urlencoded({ extended : true }));	// Use Bodyparser for post data
app.use(bodyParser.json());
app.use(cookieParser());

server = app.listen(nconf.get('node:port'), function() {

	console.log('\n*************************************************************************'
							+ '\n**********                                                     **********'
							+ '\n**********                                                     **********'
							+ '\n**********        Express.io server listening on port ' + nconf.get('node:port') + '     **********'
							+ '\n**********                                                     **********'
							+ '\n**********                                                     **********'
							+ '\n*************************************************************************\n');

});
/**
		--------------------------
		SET UP EXPRESS APP | END
		--------------------------
**/

/**
		-----------------------
		SET UP REDIS DB | START
		-----------------------
**/
db = require(path.join(__dirname, '/server/database/redis'));
db.init();
/**
		---------------------
		SET UP REDIS DB | END
		---------------------
**/

/**
		---------------------
		SET UP ROUTES | START
		---------------------
**/
routes = require(path.join(__dirname, 'server/routes'))(app);
/**
		---------------------
		SET UP ROUTES | END
		---------------------
**/
