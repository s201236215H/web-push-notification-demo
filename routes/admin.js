var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');



/* GET users listing. */
router.get('/', function(req, res) {
  	res.render('admin', {
  		title: "Admin Panel"
  	})
});

module.exports = router;
