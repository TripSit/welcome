var express = require('express');
var request = require('request');
var _ = require('underscore')._;
var router = express.Router();
var Moniker = require('moniker');

var leastCount = Infinity;
var leastChan = '#tripsit';

/* GET home page. */
router.get('/', function(req, res) {
console.log(req.headers);
  //todo: request is deprecated: https://www.npmjs.com/package/request
  request.get('https://tripbot.tripsit.me/api/cspeed/getCounts', {
    'json': true
  }, function(request, response, body) {
    if (response) {
        if (response.statusCode == 201 || response.statusCode == 200 && response.body.data != null) {
        _.each(body.data[0], function(count, chan) {
          if(count < leastCount) {
            leastChan = chan.split('.')[1];
            leastCount = count;
          }
        });

        } else {
          console.log('error conecting to API: ' + response.statusCode);
          console.log('error msg: ' + response.body.err);
        }
    } else {
        console.log('no response received from request: ' + request);
    }

    res.render('index', { title: 'Express', achan: leastChan, anick: Moniker.choose() });
  });
});

module.exports = router;
