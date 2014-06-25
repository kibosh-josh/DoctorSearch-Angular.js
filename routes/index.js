var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/testyelp', function(req, res) {



});


module.exports = router;
