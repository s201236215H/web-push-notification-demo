var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


var filePath = path.join(__dirname, "../public/userList.txt");
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express'});
});

router.get('/delAll', function(req, res) {
	fs.writeFile(filePath,'[]', function(err, data) {
		if(err)
			console.error('error when cleaning user list')
		console.log('clear all users')
	})
})





module.exports = router;
