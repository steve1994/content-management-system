var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {
    res.render('dashboard/index');
})

router.get('/login', function(req, res) {
    res.render('authentication/login');
});

router.get('/register', function(req, res) {
    res.render('authentication/register');
})

module.exports = router;
