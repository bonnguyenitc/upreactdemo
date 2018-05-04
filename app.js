const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv').load();
const flash = require('connect-flash');
const mongoose = require('./config/db.config')();

const app = express();

const index = require('./routers/index');
const imagesRouter = require('./routers/upload/images.router');
const avatarsRouter = require('./routers/upload/avatars.router');
const videosRouter = require('./routers/upload/videos.router');

var port = process.env.PORT || 3000;
// views
app.set('view engine','ejs');
// headers and content type
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
// set static
app.use("/public",express.static(__dirname+'/public'));
app.use("/src",express.static(__dirname+'/src'));
app.use("/node_modules",express.static(__dirname+'/node_modules'));
app.use("/images",express.static(path.join(__dirname, '/upload/images')));
app.use("/videos",express.static(path.join(__dirname, '/upload/videos')));
app.use("/avatars",express.static(path.join(__dirname, '/upload/avatars')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret : "softworld",
    saveUninitialized: true,
    resave: true
}));
// user route
app.use('/', index);
app.use('/images', imagesRouter);
app.use('/avatars', avatarsRouter);
app.use('/videos', videosRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, (req, res) => {
    console.log("Server is running");
});

