const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require('../../models/user.model');
const secrect = require('../../config/secrect.config');
const uploadController = require('../../controllers/upload.controller');

router.post('/upload' ,function(req, res, next) {
    // base64Img.img(req.body.data, './upload/avatars', Date.now(), function(err, filepath) {
    //     if (err) return res.send('ERROR');
    //     return res.send("SUCCESS");
    // });
    // jwt.verify(req.body.data.token, secrect, function(err, decoded) {
    //     if(err) return res.send({ result : "ERROR" });
    //     let nameFile =  Date.now() +"-"+ decoded.id;
    //     let filepath = base64Img.imgSync(req.body.data.dataUrl, './upload/avatars', nameFile);
    //     if(filepath) {
    //         if (decoded.avatar) fs.unlinkSync('./upload/avatars/' + decoded.avatar);
    //         let file = filepath.substr(15, filepath.length);
    //         User.findById(decoded.id, function (err, user) {
    //             if(err) return res.send({ result : "ERROR" });
    //             user.avatar = file;
    //             user.save(function (err, updatedUser) {
    //                 if(err) return res.send({ result : "ERROR" });
    //                 let payload = {
    //                     id: updatedUser._id,
    //                     username: updatedUser.username,
    //                     avatar: updatedUser.avatar,
    //                     isAdmin: updatedUser.isAdmin
    //                 };
    //                 let token = jwt.sign( payload, 'thoaint-softworldvn', { expiresIn: '1h' });
    //                 return res.send({ result: "OK", token: token});
    //             });
    //         });   
    //     }
    // });
    uploadController.avatar(User, req, res);
});

module.exports = router;