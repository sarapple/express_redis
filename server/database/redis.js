var redis = require("redis");
var nconf = require('nconf');

module.exports = {
	init : function() {
		this.client = redis.createClient();

		this.client.on("error", function (err) {
			LOG.info("Error " + err);
		});

		this.client.select(nconf.get('redis:db'), function(err) {
			if (err) return LOG.info("Error " + err);

			LOG.info("Using Redis DB: " + nconf.get('redis:db'));
		});

		return this.client;
	},
	use : function() {
		return this.client;
	}
};
