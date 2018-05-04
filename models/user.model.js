const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchame = new Schema({
    username   : { type: String, required : true },
    password   : { type: String, required : true },
    avatar     : { type: String },
    isAdmin    : { type: Number }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

var user = mongoose.model('User', userSchame);

module.exports = user;