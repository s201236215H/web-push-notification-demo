var express = require('express');
var router = express.Router();
var webpush = require('web-push');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');


var filePath = path.join(__dirname, "../public/userList.txt");


router.post('/ID',bodyParser.text(), function(req, res) {
  console.log('we get the push request');
  console.log(req.body);
  const params = {
    payload: "This is payload(message)"
  };
  var subscription = JSON.parse(req.body);
  console.log("subscription: " + subscription);
  if(subscription.keys) {
    params.userPublicKey = subscription.keys.p256dh;
    params.userAuth = subscription.keys.auth;
  }

  webpush.setGCMAPIKey("AIzaSyDbXPaANyJa10pVXYRIOqi2_67XziLeS9E");

  webpush.sendNotification(subscription.endpoint, params)

  res.send('done!');
});

router.post('/',bodyParser.text(), function(req, res) {
  console.log('we get the push request');
  console.log(req.body);
  const params = {
    payload: "This is payload(message)"
  };
  var subscription = JSON.parse(req.body);
  if(subscription.keys) {
    params.userPublicKey = subscription.keys.p256dh;
    params.userAuth = subscription.keys.auth;
  }

  webpush.setGCMAPIKey("AIzaSyDbXPaANyJa10pVXYRIOqi2_67XziLeS9E");
  fs.readFile(filePath,'utf8', function(err, data) {
    if(err)
      throw err
      console.log(data);
    var userList = JSON.parse(data)
    userList[JSON.stringify(subscription)] = true
    console.log("userList string: " + JSON.stringify(userList));
    console.log("userList json: " + userList);
    fs.writeFile(filePath,JSON.stringify(userList), function(err) {
      if(err) throw err;
      console.log("complete");
    })
  })


  webpush.sendNotification(subscription.endpoint, params)

  res.send('done!');
});

module.exports = router;
