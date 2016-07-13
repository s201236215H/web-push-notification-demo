var express = require('express');
var router = express.Router();
var webpush = require('web-push-encryption');
var bodyParser = require('body-parser');

/* TODO: Get the body the request */
/* Delegate push send. */
router.post('/',bodyParser.text(), function(req, res) {
  console.log('we get the push request');
  console.log(req.body);
  //var subscription = req.body.toJSON();
  //webpush.sendWebPush('This push sent from web server', subscription);
  res.send('done!');
});

module.exports = router;
