const express = require('express');
const router = express.Router();
const session = require('express-session');
const multer  = require('multer');
const Upload = require('../../models/upload.model');
const secrect = require('../../config/secrect.config');
const uploadController = require('../../controllers/upload.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/videos');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage, fileFilter: extFile });

function extFile(req, file, cb) {
    if(!file.originalname.match(/\.(mp4|mp3)$/)){
        return cb(new Error('Chỉ chấp nhận file video'));
    }else{
        cb(null, true);
    }
}

router.post('/upload', upload.any() ,function(req, res, next) {
    // let token = req.rawHeaders[7].slice(7);
    // // console.log(token);
    // jwt.verify(token, 'thoaint-softworldvn', function(err, decoded) {
    //     if(err) return res.send({ result : "ERROR" });
    //     req.files.map((file, index) => {
    //         let video = new Upload({
    //             name: file.filename,
    //             idUser: decoded.id,
    //             type: 'video',
    //             size: file.size  
    //         });
    //         video.save(function (err, videoObj) {
    //             if (err) {
    //                 return res.status(404).json({ result : 'ERROR' });
    //             }
    //             // console.log(videoObj);
    //             return res.status(200).json(videoObj);
    //         });
    //     })
    // });
    uploadController.videos(Upload, req, res);
});



module.exports = router;