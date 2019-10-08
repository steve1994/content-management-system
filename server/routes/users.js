var express = require('express');
var router = express.Router();
const User = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let retypepassword = req.body.retypepassword;
    if (password == retypepassword) {
        User.findOne({'email':email}, function (err,user) {
            if (err) throw err;
            if (user) {
                res.status(400).json({'error':'email is already registered'});
            } else {
                let token = jwt.sign({'email':email}, 'persib1994secret');
                bcrypt.hash(password, saltRounds, function (err,hash) {
                    const userNew = new User({'email':email,'password':hash,'token':token});
                    userNew.save(()=>{
                        res.status(200).json({data:{'email':email},'token':token});
                    });
                });
            }
        })
    } else {
        res.status(400).json({'error':'invalid data password and retypepassword'});
    }
});

router.post('/login',function (req,res) {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({'email':email}, function (err,user) {
        if (err) {
            res.status(400).json({error:err});
        } else {
            if (user) {
                bcrypt.compare(password, user.password, function (err,valid) {
                    if (valid) {
                        let token = jwt.sign({'email':email}, 'persib1994secret');
                        User.findOneAndUpdate({'email':email},{'token':token},function (err,response) {
                            if (err) {
                                res.status(400).json({error:err});
                            } else {
                                res.status(200).json({data:{'email':email},'token':token});
                            }
                        })
                    } else {
                        res.status(400).json({'error':'email/password not correct'});
                    }
                })
            } else {
                res.status(400).json({'error':'email/password not correct'});
            }
        }
    })
})

router.get('/check',function (req,res) {
    let token = req.header('Authorization');
    User.findOne({'token':token}, function (err,user) {
        if (err) {
            res.status(400).json({error:err});
        } else {
            if (user) {
                res.status(200).json({valid:true});
            } else {
                res.status(200).json({valid:false});
            }
        }
    })
})

router.get('/destroy',function (req,res) {
    let token = req.header('Authorization');
    User.findOneAndUpdate({'token':token},{'token':''},function (err,response) {
        if (err) {
            res.status(400).json({logout:false});
        } else {
            res.status(200).json({logout:true});
        }
    })
})

module.exports = router;
