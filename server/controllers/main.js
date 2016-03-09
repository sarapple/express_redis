var db = require('../database/redis');
var client = db.use();
var Redis = require('ioredis');
var redis = new Redis();

module.exports = {
	insert: function(req, res) {
		// client.hmset("2923kas9:10.324,-5.234", {
		// 	team : "red",
		// 	time : 350
		// });

		return res.json({});
	},
	script: function(req, res) {
		redis.defineCommand('echo', {
		  numberOfKeys: 2,
		  lua: `
				return redis.call('hget',KEYS[1],KEYS[2])
			`
		});
		// client.multi().script('load', `
		// 	return redis.call('hget','2923kas9:10.324,-5.234')
		// `).exec(function(err, replies) {
		// 	client.send_command(['evalsha', replies[0] + '0'], function(err, res){
		// 		console.log(err);
		// 		console.log(res);
		// 		console.log('now in here');
		// 	});
			// console.log(replies);
			// console.log('hi');
			// client.multi([
			//     ["evalsha", replies[0], 0],
			// ]).exec(function (err, replies) {
			//     console.log(replies);
			//return res.json({});
			// });
	//	});

		return res.json({});
	},
	runscript: function(req, res) {
		redis.echo('2923kas9:10.324,-5.234', 'team', function (err, result) {
console.log(result);
});
		// client.multi([
		//     ["evalsha", "4d6cd77985d3cc27ed9dfc968912f3384681cb53", "0", redis.print],
		// ]).exec(function (err, replies) {
		//     console.log(replies);
		// 		return res.json({});
		// });
		return res.json({});
	}
}
