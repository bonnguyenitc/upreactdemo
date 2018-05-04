const secrect = require('../config/secrect.config');
const fs = require('fs');
const base64Img = require('base64-img');
const jwt = require('jsonwebtoken');
let upload = {
    'avatar': (User, req, res) => {
        jwt.verify(req.body.data.token, secrect, function(err, decoded) {
            if(err) return res.send({ result : "ERROR" });
            let nameFile =  Date.now() +"-"+ decoded.id;
            let filepath = base64Img.imgSync(req.body.data.dataUrl, './upload/avatars', nameFile);
            if(filepath) {
                if (decoded.avatar) fs.unlinkSync('./upload/avatars/' + decoded.avatar);
                let file = filepath.substr(15, filepath.length);
                User.findById(decoded.id, function (err, user) {
                    if(err) return res.send({ result : "ERROR" });
                    user.avatar = file;
                    user.save(function (err, updatedUser) {
                        if(err) return res.status(404).json({ result : "ERROR" });
                        let payload = {
                            id: updatedUser._id,
                            username: updatedUser.username,
                            avatar: updatedUser.avatar,
                            isAdmin: updatedUser.isAdmin
                        };
                        let token = jwt.sign( payload, 'thoaint-softworldvn', { expiresIn: '1h' });
                        return res.status(200).json({ result: "OK", token: token});
                    });
                });   
            }
        });
    },
    'images': (Upload, req, res) => {
        let token = req.rawHeaders[7].slice(7);
        jwt.verify(token, secrect, async function(err, decoded) {
            if(err) return res.send({ result : "ERROR" });
            await req.files.map((file, index) => {
                let image = new Upload({
                    name: file.filename,
                    idUser: decoded.id,
                    type: 'image',
                    size: file.size  
                });
                image.save(function (err, imageObj) {
                    if (err) {
                        console.log(err);
                        return res.status(404).json({ result : 'ERROR' });              
                    }
                    // console.log(imageObj);
                    // res.status(200).json({ result : 'OK'}); 
                });
            })
            res.status(200).json({ result : 'OK'});
        });
    },
    'videos': (Upload, req, res) => {
        let token = req.rawHeaders[7].slice(7);
        // console.log(token);
        jwt.verify(token, 'thoaint-softworldvn',async function(err, decoded) {
            if(err) return res.send({ result : "ERROR" });
            await req.files.map((file, index) => {
                let video = new Upload({
                    name: file.filename,
                    idUser: decoded.id,
                    type: 'video',
                    size: file.size  
                });
                video.save(function (err, videoObj) {
                    if (err) {
                        return res.status(404).json({ result : 'ERROR' });
                    }
                    // console.log(videoObj);
                });
            })
            return res.status(200).json({ result : 'OK'});
        });
    }
}

module.exports = upload;