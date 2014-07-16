var express = require('express');
var http = require('http');
var router = express.Router();
var yelp = require("yelp").createClient({
  consumer_key: "z2VJ96DqG-xLxm67yYfJXw", 
  consumer_secret: "yqn99rCLlhrCUhEpNipymC27SIk",
  token: "7fJeusbwxgbQEbmizs6CafSwxIx5-1L-",
  token_secret: "kll6K39QuwwB9Y5sPq_2TqqBXbk"
});

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/lookup', function(request, response) {

  var q = request.query.q;
  var l = request.query.l;
  var limit = request.query.limit

  yelp.search({term: q, location: l, limit: limit}, function(error, data) {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
  });
});

module.exports = router;
