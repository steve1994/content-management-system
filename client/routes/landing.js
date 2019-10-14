var express = require('express');
var router = express.Router();  

router.get('/', function(req, res) {
    res.render('landing/index');
});

router.get('/data', function(req, res) {
    res.render('landing/data');
})

router.get('/datadate', function(req,res) {
    res.render('landing/datadate');
})

router.get('/map', function(req,res) {
    res.render('landing/map');
})

module.exports = router;
