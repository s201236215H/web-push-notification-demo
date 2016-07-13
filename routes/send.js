var express = require('express');
var router = express.Router();
var webpush = require('web-push-encryption');

/* TODO: Get the body the request */
/* Delegate push send. */
router.post('/', function(req, res) {
  console.log('we get the push request');
  console.log(req);
  //var subscription = req.body.toJSON();
  webpush.send('This push sent from web server', subscription);
});

module.exports = router;
