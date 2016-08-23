var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res) {
  fs.readFile(path.resolve(__dirname, 'userList.txt'), function(err, data) {
  	//var user_list = JSON.parse(data)
  	console.log("user_list: " + data)
  	res.render('admin')
  });
});

module.exports = router;
