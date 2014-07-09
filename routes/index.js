var express = require('express');
var http = require('http');
var router = express.Router();
var yelp = require("yelp").createClient({
  consumer_key: "z2VJ96DqG-xLxm67yYfJXw", 
  consumer_secret: "yqn99rCLlhrCUhEpNipymC27SIk",
  token: "7fJeusbwxgbQEbmizs6CafSwxIx5-1L-",
  token_secret: "kll6K39QuwwB9Y5sPq_2TqqBXbk"
});

var yelpv1_phone = function(phone, callback) {
  var options = {
    hostname: 'api.yelp.com'
    ,port: 80
    ,path: '/phone_search'
    ,method: 'GET'
    ,headers: { 'Content-Type': 'application/json' }
    ,data: {phone: phone}
  };

  http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        console.log(data);
        callback(data); 
    });
  });
};


router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/phone_lookup', function(request, response) {

  var q = request.query.q;
        console.log(q);

  yelpv1_phone(q, function(data) {
    console.log('ypcallback');
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
  });
 
});

router.get('/lookup', function(request, response) {

  var q = request.query.q;
  var l = request.query.l;

  yelp.search({term: q, location: l}, function(error, data) {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
  });
});

module.exports = router;
