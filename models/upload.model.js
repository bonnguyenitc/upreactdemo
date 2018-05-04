const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var uploadSchame = new Schema({
    name   : { type: String, required : true },
    idUser   : { type: String, required : true },
    type     : { type: String, required : true },
    size : { type: Number, required: true }
},
{
    timestamps: { createdAt: 'created_at'}
});

var upload = mongoose.model('Upload', uploadSchame);

module.exports = upload;