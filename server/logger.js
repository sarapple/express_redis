//set up logging
var winston = require('winston');

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: __dirname + '/logs/' + 'logs' + '.log' })
  ]
});
