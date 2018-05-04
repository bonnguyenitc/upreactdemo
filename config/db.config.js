const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://bonnguyenitc:123456@ds247439.mlab.com:47439/dbdemoapp');
    console.log('Connected DB');
}