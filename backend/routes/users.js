var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    "user": "user1",
    "password": "passw0rd"
  });
});

module.exports = router;
