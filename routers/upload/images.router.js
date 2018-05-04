const express = require('express');
const router = express.Router();
const session = require('express-session');
const multer  = require('multer');
const Upload = require('../../models/upload.model');
const uploadController = require('../../controllers/upload.controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage, fileFilter: extFile });

function extFile(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)){
        return cb(new Error('Chỉ chấp nhận file hình'));
    }else{
        cb(null, true);
    }
}

router.post('/upload', upload.any() ,function(req, res, next) {
    // let token = req.rawHeaders[7].slice(7);
    // jwt.verify(token, 'thoaint-softworldvn', function(err, decoded) {
    //     if(err) return res.send({ result : "ERROR" });
    //     req.files.map((file, index) => {
    //         let image = new Upload({
    //             name: file.filename,
    //             idUser: decoded.id,
    //             type: 'image',
    //             size: file.size  
    //         });
    //         image.save(function (err, imageObj) {
    //             if (err) {
    //                 return res.status(404).json({ result : 'ERROR' });
    //             }
    //             console.log(imageObj);
    //             return res.status(200).json(imageObj);
    //         });
    //     })
    // });
    uploadController.images(Upload, req, res);
});



module.exports = router;