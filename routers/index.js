const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.post('/logup', (req, res, next) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.user.password, salt, function(err, hash) {
            let user = new User({
                username: req.body.user.username,
                password: hash,
                avatar : '',
                isAdmin : 1
            });
            user.save(function (err, userObj) {
                if (err) {
                    return res.status(404).json({ result : 'ERROR' });
                }
                return res.status(200).json(userObj);
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    // console.log(req.body);
    User.findOne({ username : req.body.username }, (err, response) => {
        if(err || !response) return res.status(200).json({ auth: false, message: 'ERROR'});
        bcrypt.compare(req.body.password, response.password, function(err, result) {
            // res === true
            if(err || !result) return res.status(200).json({ auth : false, message: 'ERROR'});
            let payload = {
                id: response._id,
                username: response.username,
                avatar: response.avatar,
                isAdmin: response.isAdmin
            };
            let token = jwt.sign( payload, 'thoaint-softworldvn', { expiresIn: '1h' });
            res.status(200).json({ auth: true, message: token });
        });
    })
});




module.exports = router;