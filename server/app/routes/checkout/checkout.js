// assume all routes start with api/checkout

var router = require('express').Router();
module.exports = router;

router.post('/', function(req, res, next){
  // do the thing
  console.log('made it to the back end with this payload ', req.body);
})
