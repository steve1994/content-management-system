var express = require('express');
var router = express.Router();

router.get('/', function(req,res) {
    res.render('dashboard/index');
})

router.get('/line', function(req,res) {
    res.render('dashboard/line');
})

router.get('/pie', function(req,res) {
    res.render('dashboard/pie');
})

router.get('/bar', function(req,res) {
    res.render('dashboard/bar');
})

router.get('/map', function(req,res) {
    res.render('dashboard/map');
})

router.get('/login', function(req, res) {
    res.render('authentication/login');
});

router.get('/register', function(req, res) {
    res.render('authentication/register');
})

module.exports = router;
