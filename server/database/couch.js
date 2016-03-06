//setup db
module.exports = function(nconf){
  var couchUrl = "http://" + nconf.get('development:couch:host') + ":" + nconf.get('development:couch:port');
  var nano = require('nano')(couchUrl);
  var couch = nano.db.use('flow');      //specify the database we are going to use

  return couch;
}
