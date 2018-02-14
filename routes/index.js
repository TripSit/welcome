var express = require('express');
var request = require('request');
var _ = require('underscore')._;
var router = express.Router();
var Moniker = require('moniker');

/* GET home page. */
router.get('/', function(req, res) {
console.log(req.headers);
  request.get('http://tripbot.tripsit.me/api/cspeed/getCounts', {
    'json': true
  }, function(request, response, body) {
    var leastCount = Infinity;
    var leastChan = '#tripsit';
    _.each(body.data[0], function(count, chan) {
      if(count < leastCount) {
        leastChan = chan.split('.')[1];
        leastCount = count;
      }
    });
    res.render('index', { title: 'Express', achan: leastChan, anick: Moniker.choose() });
  });
});

module.exports = router;

