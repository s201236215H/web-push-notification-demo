var express = require('express');
var router = express.Router();
var webpush = require('web-push-encryption');

/* TODO: Get the body the request */
/* Delegate push send. */
router.post('/', function(req, res) {
  console.log('we get the push request');
  console.log(req.body);
  //var subscription = req.body.toJSON();
  webpush.sendWebPush('This push sent from web server', subscription);
  res.send('done!');
});

module.exports = router;
